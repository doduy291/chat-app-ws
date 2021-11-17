import dotenv from 'dotenv';
dotenv.config();

const corsConfig = {
  // Configures the Access-Control-Allow-Origin
  origin: process.env.NODE_ENV === 'development' ? process.env.CLIENT_LOCAL_BASE_URL : process.env.CLIENT_BASE_URL,

  // Configures the Access-Control-Allow-Methods
  methods: 'GET, POST, PUT, PATCH, OPTIONS',

  //Configures the Access-Control-Allow-Headers
  allowedHeaders:
    'X-Requested-With, X-HTTP-Method-Override,Origin, Content-Type, Accept, Authorization, x-no-compression',

  // Configures the Access-Control-Allow-Credentials
  credentials: true,
};

export default corsConfig;
