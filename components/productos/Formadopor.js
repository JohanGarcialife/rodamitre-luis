import React from "react";

export default function Formadopor(props) {
  const { formadopor, setBuscar, setBuscador } = props;

  let arr = formadopor?.split(",");

  function handlebuscar(event) {
    setBuscar(event);
    //router.push(`/?query=${event}`)
    setBuscador("Rapida");
  }

  return (
    <div className="flex font-normal ">
      {arr?.map((ar) => (
        <div className="flex flex-row">
          <p
            className="cursor-pointer hover:border-b-2 hover:border-amarillo text-xs"
            onClick={() => handlebuscar(ar)}
          >
            {ar}&nbsp;&nbsp;
          </p>
        </div>
      ))}
    </div>
  );
}
