const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughController {
  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Tought,
      plain: true,
    });

    const toughts = user.Toughts.map((result) => result.dataValues);

    let emptyToughts = true;

    if (toughts.length > 0) {
      emptyToughts = false;
    }

    console.log(toughts);
    console.log(emptyToughts);

    res.render("toughts/dashboard", { toughts, emptyToughts });
  }

  static createTought(req, res) {
    res.render("toughts/create");
  }

  static createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    Tought.create(tought)
      .then(() => {
        req.flash("message", "Pensamento criado com sucesso!");
        req.session.save(() => {
          res.redirect("/toughts/dashboard");
        });
      })
      .catch((err) => console.log());
  }

  static showToughts(req, res) {
    Tought.findAll({
      raw: true,
      include: User,
    })
      .then((data) => {
        let emptyToughs = false;

        if (data.length === 0) {
          emptyToughs = true;
        }

        console.log(data[5]);
        console.log(data[5]["User.id"]);

        res.render("toughts/home", { toughts: data, emptyToughs });
      })
      .catch((err) => console.log(err));
  }

  static removeTought(req, res) {
    const id = req.body.id;

    Tought.destroy({ where: { id: id } })
      .then(() => {
        req.flash("message", "Pensamento removido com sucesso!");
        req.session.save(() => {
          res.redirect("/toughts/dashboard");
        });
      })
      .catch((err) => console.log());
  }

  static updateTought(req, res) {
    const id = req.params.id;

    Tought.findOne({ where: { id: id }, raw: true })
      .then((tought) => {
        res.render("toughts/edit", { tought });
      })
      .catch((err) => console.log());
  }

  static updateToughtPost(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
      description: req.body.description,
    };

    Tought.update(tought, { where: { id: id } })
      .then(() => {
        req.flash("message", "Pensamento atualizado com sucesso!");
        req.session.save(() => {
          res.redirect("/toughts/dashboard");
        });
      })
      .catch((err) => console.log());
  }

  static toggleToughtStatus(req, res) {
    const id = req.body.id;

    console.log(req.body);

    const Tought = {
      done: req.body.done === "0" ? true : false,
    };

    console.log(Tought);

    Tought.update(Tought, { where: { id: id } })
      .then(res.redirect("/toughts"))
      .catch((err) => console.log());
  }
};
