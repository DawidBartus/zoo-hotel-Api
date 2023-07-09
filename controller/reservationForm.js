const nodemailer = require("nodemailer");

require("dotenv").config();
const sender = process.env.AUTHUSERNAME;
const senderPassword = process.env.AUTHPASS;
const companyMail = process.env.COMPANY;

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: sender,
    pass: senderPassword,
  },
});

const confirmReservation = async (req, res, next) => {
  const {
    email,
    phone,
    name,
    breed,
    startVisit,
    endVisit,
    puppy,
    adult,
    senior,
    transport,
    food,
  } = req.body;

  const dogAge = () => {
    if (puppy) {
      return "szczeniak";
    } else if (adult) {
      return "dorosły pies";
    } else {
      return "senior";
    }
  };

  await transporter
    .sendMail({
      from: `"ZooHotel Zakopane", <${sender}>`,
      to: email,
      bcc: companyMail,
      subject: "Reservation confirmation",
      text: "Potwierdzenie rezerwacji",
      html: `<div
      style="
        width: 100%;
        max-width: 600px;
        font-size: 18px;
        background-color: #dfe0e2;
        padding: 20px;
      "
    >
      <p style="display: flex; justify-content: center; font-size: 26px">
        ${name}, dziękujemy za wiadomość!
      </p>

      <p>
        W kolejnej wiadomości od nas otrzymasz potwierdzenie rezerwacji.
        <span>Tylko po otrzymaniu go rezerwacja jest ważna</span>
      </p>
      <p>
        Jeśli będziemy musieli się z tobą skontakować, zadzwonimy pod numer,
        który nam podałeś: ${phone}
      </p>

      <p style="font-size: 24px">
        Twój psiak będzie z nami od ${startVisit} do ${endVisit}.
      </p>

      <p>
        W razie pytań skontaktuj się z nami:
        <a href="tel:+ 000 000 000"> 123123123</a>
      </p>

      <p style="text-align: center">
        Opcja transportu działa w Zakopanym maksymalnie +10km. Potwierdź miejsce
        odbioru do 3 dni przed datą planowanego przyjazdu.
      </p>
      <p
        style="
          background-color: #5a0002;
          color: white;
          padding: 8px;
          margin: 30px;
          font-size: 24px;
          border-radius: 8px;
        "
      >
        Przed wyjazdem sprawdź czy pies ma ważne szczeniepia, jeśli nie, ze
        względu na dobro innych podopiecznych odmówimy przyjęcia zwierzaka.
      </p>

      <h3>Pamiętaj o zabraniu:</h3>
      <ol>
        <li>Książeczka szczepień - sprawdź czy są aktulane!</li>
        <li>Jedzenie dla zwierzaka.</li>
        <li>Ulubioną zabawkę.</li>
      </ol>

      <p>
        Za pobyt zapłacisz gotówką, zabierz ją ze sobą. Nie ma możliwości
        płatności kartą.
      </p>
      <div>
        <h3>Dane które nam podałeś:</h3>
        <ul>
          <li>Początek wizyty: ${startVisit}</li>
          <li>Koniec wizyty: ${endVisit}</li>
          <li>Rasa psa: ${breed}</li>
          <li>Twój psiak: ${dogAge()}</li>
          ${
            transport
              ? `
          <li>Odbierzemy twojego zwierzaka ze wskazanego adresu.</li>
          `
              : ""
          } ${
        food
          ? `
          <li>Zagwarantujemy jedzenie dla zwierzaka</li>
          `
          : ""
      }
        </ul>
      </div>
    </div>`,
    })
    .then(
      res.json({
        status: "OK",
        code: 200,
        message: "Email send",
      })
    )
    .catch((error) => {
      console.error(error);
      res.json({ message: error });
    });
};

module.exports = { confirmReservation };
