const Commande = require("../models/Commande");
const Annonce = require("../models/Annonce");
const ProduitPanier = require("../models/ProduitPanier");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// GET getCommande
exports.getCommandesUser = async (req, res) => {
  try {
    const commandes = await Commande.find({ user: req.payload.id });
    res.json(commandes);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// POST checkout
exports.checkout = async (req, res) => {
  try {
    let paniers = [];
    for (let item of req.body) {
      let annonce = await Annonce.findById(item.annonce._id);
      paniers.push({ annonce, qteAchat: item.qteAchat });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "eur",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "eur",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: paniers.map((item) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.annonce.nomProduit,
            },
            unit_amount: item.annonce.prix * 100,
          },
          quantity: item.qteAchat,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/commande`,
      cancel_url: `${process.env.CLIENT_URL}/panier`,
    });
    await Commande.create({
      user: req.payload.id,
      orderItems: req.body,
      status: "pending",
      payment_intent: session.id,
      totalPrice: session.amount_total,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// event after the checkout
exports.hooks = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event;

    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_PRIVATE_WEB_HOOK
    );
    const resultPayment = event.data.object;
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        fulfillSession(resultPayment);
      case "charge.failed":
        failedOrder(resultPayment);
      default:
        break;
    }

    res.send();
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

// POST rembourser une commande
exports.refund = async (req, res) => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: req.body.id_payment,
    });
    let commande = await Commande.findOne({
      payment_intent: req.body.id_payment,
    });
    commande.status = "refunded";
    await commande.save();
    await commande.populate("orderItems");

    // récuperer l'annonce qui a été acheter
    for (let item of commande.orderItems) {
      await item.populate("annonce");
    }

    res.json(commande);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

// validé la commande après le payement
const fulfillSession = async (session) => {
  try {
    let commande = await Commande.findOne({
      payment_intent: session.id,
    });
    if (commande) {
      commande.status = "success";
      commande.shippingDetails.address = session.customer_details.address;
      commande.shippingDetails.email = session.customer_details.email;
      commande.shippingDetails.phone = session.customer_details.phone;
      commande.shippingDetails.name = session.customer_details.name;
      commande.totalPrice = session.amount_total;
      await commande.save();

      for (let item of commande.orderItems) {
        let produitPanier = await ProduitPanier.findById(item);
        produitPanier.bought = true;
        await produitPanier.save();
      }
    } else {
      console.log("commande non trouvé");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// échec lors du payement
const failedOrder = async (session) => {
  try {
    let commande = await Commande.findOne({
      payment_intent: session.payment_intent,
    });

    commande.status = "failed";
    commande.shippingDetails.address = session.customer_details.address;
    commande.shippingDetails.email = session.billing_details.email;
    commande.shippingDetails.phone = session.billing_details.phone;
    commande.shippingDetails.name = session.billing_details.name;
    await commande.save();
  } catch (error) {
    console.log(error.message);
  }
};
