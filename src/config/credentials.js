module.exports = {
  email: {
    host: "smtp.ptempresas.pt",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'Info@cinco-estrelas.pt',
      pass: 'IEG3Ydnu'
    }
  },
  firebase: {
    apiKey: "AIzaSyC0P1Y5icESFVzWt_TTb7OM1netG2PTU9M",
    authDomain: "portugal-8da161.firebaseapp.com",
    databaseURL: "https://portugal-8da16.firebaseio.com",
    projectId: "portugal-8da16",
    storageBucket: "portugal-8da16.appspot.com",
    messagingSenderId: "140635668585"
  },
  JWT_SECRET: '224b9da9083e1a2080cf1bfd34a37c44',
  EMAIL_SOLT: 'fab710ed9e72c7358e6a52b471845fa8',
  PASS_SOLT: '4062a4e163e4d2cedc42559214d10433',
  PRIVATEKEY_SOLT: "e74d7c0de21e72aaffc8f2eef2bdb7c1",
  MAIL_FROM: "pankaj.yadav@mail.vinove.com",
  SMTP_SERVER: "mlsrvr.vinove.com",
  SMTP_PORT: 587,
  MAIL_AUTH: {
    user: 'pankaj.yadav@mail.vinove.com',
    pass: 'pankaj@123'
  },
  SOLT_ROUND: 10,
  ROLES: ["ADMIN", "USER", "SUPER_ADMIN"]
};
