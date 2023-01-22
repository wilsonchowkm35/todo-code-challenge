import { createMachine, interpret } from "xstate";
import { useActor } from "@xstate/vue";
// import { useRouter } from "vue-router";

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
        console.log("authenicating...");
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
// const router = useRouter();
// console.log('router', router)
authService
  .onTransition((state) => {
    console.log("state", state.value, typeof state.value);
    // currentState = state.value;
    // const stateStr: string = state.value || '';
    // console.log(stateStr);
    if (state.value === "loggedIn") {
      // router.push("board");
    }
  })
  .start();

export const useAuthService = () => {
  return useActor(authService);
};
