import { createMachine, interpret } from "xstate";
import { useActor } from "@xstate/vue";

export const authMachine = createMachine(
  {
    id: "authMachine",
    initial: "autenicating",
    predictableActionArguments: true,
    states: {
      autenicating: {
        invoke: {
          id: "authenicate",
          src: "authenicate",
        },
        on: {
          USER_LOGGED_IN: {
            target: "loggedIn",
          },
          USER_LOGGED_OUT: {
            target: "loggedOut",
          },
        },
      },
      loggedOut: {
        on: {
          USER_LOGGING: {
            target: "autenicating",
          },
        },
      },
      loggedIn: {
        // entry: 'notify'
      },
    },
  },
  {
    services: {
      authenicate: () => (send) => {
        localStorage.getItem("username")
          ? send({
              type: "USER_LOGGED_IN",
              username: localStorage.getItem("username"),
            })
          : send({ type: "USER_LOGGED_OUT" });
      },
    },
  }
);

const authService = interpret(authMachine);
authService.start();

export const useAuthService = () => {
  return useActor(authService);
};
