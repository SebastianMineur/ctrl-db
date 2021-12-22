module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '42085ccbafd4001b86842f1a9014f027'),
  },
});
