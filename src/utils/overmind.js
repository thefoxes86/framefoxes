import { createOvermind } from "overmind";
import { createStateHook, createActionsHook } from "overmind-react";

const useState = createStateHook();

const useActions = createActionsHook();

const overmind = createOvermind({
  state: {
    user: null,
  },
  actions: {
    setState({ state }, value) {
      state.user = value;
    },
  },
});

export { useState, useActions, overmind };
