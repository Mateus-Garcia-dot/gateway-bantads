declare global {
  namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        ACCOUNT_URL: string;
        ADDRESS_URL: string;
        CUSTOMER_URL: string;
        MANAGER_URL: string;
        AUTHENTICATION_URL: string;
        ORCHESTRATOR_URL: string;
    }
  }
}

export {}