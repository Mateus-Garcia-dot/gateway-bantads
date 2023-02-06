declare global {
  namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        ACCOUNT_URL: string;
        ACCOUNT_PORT: number;
        ADDRESS_URL: string;
        ADDRESS_PORT: number;
        CUSTOMER_URL: string;
        CUSTOMER_PORT: number;
        MANAGER_URL: string;
        MANAGER_PORT: number;
        AUTHENTICATION_URL: string;
        AUTHENTICATION_PORT: number;
    }
  }
}

export {}