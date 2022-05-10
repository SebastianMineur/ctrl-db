import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import cls from "classnames";

import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";

import { useAuthContext } from "../../contexts/AuthContext";
import {
  CREATE_COMMAND,
  GET_COMMANDS_BY_PROTOCOL,
} from "../../queries/commands";
import css from "./css/CommandList.module.css";
import { alert } from "../../assets/icons";
import { Link } from "react-router-dom";

const hexToAscii = (hex) => {
  const arr = [];
  for (let i = 0; i < hex.length; i += 2) {
    const char = hex.slice(i, i + 2);
    arr.push(parseInt(char, 16));
  }
  return String.fromCharCode(...arr);
};

const CommandList = ({ protocolId }) => {
  const { currentUser } = useAuthContext();
  const descRef = useRef();
  const codeRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState();
  const commandsQuery = useQuery(GET_COMMANDS_BY_PROTOCOL, {
    variables: { protocol: protocolId },
  });
  const [mutate] = useMutation(CREATE_COMMAND);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await mutate({
        variables: {
          id: protocolId,
          desc: descRef.current.value,
          code: codeRef.current.value,
        },
      });
      await commandsQuery.refetch();
      descRef.current.value = "";
      codeRef.current.value = "";
      descRef.current.focus();
    } catch (error) {
      setSubmitError(error.message);
    }
    setSubmitting(false);
  };

  if (commandsQuery.loading) return <LoadingPage />;

  if (!currentUser && !commandsQuery.data.commands?.length)
    return (
      <p className="m-1">
        No commands added for this protocol. <Link to="/login">Log in</Link> to
        contribute.
      </p>
    );

  return (
    <form className={css.CommandList} onSubmit={handleSubmit}>
      {commandsQuery.data.commands?.map((command) => (
        <React.Fragment key={command.id}>
          <label className="m-0">{command.name}</label>

          <p className={cls(css.Code, "radius-sm b-1 m-0")}>{command.code}</p>
        </React.Fragment>
      ))}

      {currentUser && (
        <>
          <Input
            className={cls(css.Description, "bg-white")}
            placeholder="Description"
            size="1"
            required
            ref={descRef}
            disabled={submitting}
          />

          <Input
            className="bg-white font-mono"
            placeholder="Code"
            size="1"
            required
            ref={codeRef}
            disabled={submitting}
          />

          {submitError && (
            <div className={cls(css.Buttons)}>
              <Alert icon={alert} color="danger">
                <p>{submitError}</p>
              </Alert>
            </div>
          )}

          <div className={cls(css.Buttons, "flex justify-center gap-1")}>
            <Button
              type="submit"
              variant="filled"
              color="success"
              disabled={submitting}
            >
              {submitting && <Spinner />}
              Submit
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default CommandList;
