import React, { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import styled from "@emotion/styled";
import ProductoInfo from "../producto/ProductoInfo";
import Aplicaciones from "../producto/Aplicaciones";
import Subtotal from "../producto/Subtotal";
import Marca from "../producto/Marca";
import Pedir from "../producto/Pedir";
import Precio from "../producto/Precio";
import Contador from "../producto/Contador";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItemsWithId,
} from "@/features/cartSlice";

export default function RowBuscadorFamilia(props) {
  const { producto, buscar, setBuscar, setBuscador } = props;
  const {
    atributos,
    codigo,
    comentarios,
    descuento_marca,
    descuento_producto,
    descuento_rubro,
    es_parte_de,
    formado_por,
    intercambiables,
    mar_id,
    marca_articulo,
    notas,
    ppa_precio,
    pre_id,
    pre_stock_actual,
    rubro,
    rup_id,
    spr_id,
    super_rubro,
  } = producto;
  const [quantity, setQuantity] = useState(0);

  const items = useSelector((state) => selectCartItemsWithId(state, pre_id));

  const dispatch = useDispatch();

  const handleAddItem = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveItem = () => {
    setQuantity(quantity - 1);
    if (!quantity > 0) return;
  };

  const addItemToCart = () => {
    dispatch(
      addToCart({
        atributos,
        codigo,
        comentarios,
        descuento_marca,
        descuento_producto,
        descuento_rubro,
        es_parte_de,
        formado_por,
        intercambiables,
        mar_id,
        marca_articulo,
        notas,
        ppa_precio,
        pre_id,
        pre_stock_actual,
        rubro,
        rup_id,
        spr_id,
        super_rubro,
        quantity,
      })
    );
  };

  const TableRowStyled = styled(TableRow)`
    &:nth-of-type(odd) {
      background-color: #e8e8ff;
    }
    &:nth-of-type(even) {
      background-color: #f5f5f5;
    }
    & td,
    th {
      width: fit-content;
      text-align: center;
    }
  `;
  return (
    <TableRowStyled
      key={producto?.pre_id}
      className="text-black p-5 flex justify-between w-full last-of-type:rounded-b-lg items-center"
    >
      <TableCell className="w-full">
        <ProductoInfo
          producto={producto}
          setBuscar={setBuscar}
          buscar={buscar}
          setBuscador={setBuscador}
        />
      </TableCell>
      <TableCell className="w-full text-center">
        {producto?.aplicaciones ? (
          <Aplicaciones
            aplicaciones={producto.aplicaciones}
            srubro={producto.super_rubro}
          />
        ) : null}
      </TableCell>
      <TableCell className="w-full flex justify-center text-center">
        <Marca producto={producto} />
      </TableCell>
      <TableCell className="w-full text-center">
        <Precio producto={producto} />
      </TableCell>
      {/* contador */}
      <TableCell className="w-full flex justify-center">
        <Contador
          producto={producto}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
        />
      </TableCell>
      <TableCell className="w-full text-center">
        <Subtotal producto={producto} quantity={quantity} />
      </TableCell>
      <TableCell className="w-full text-center space-y-2">
        <Pedir producto={producto} addItemToCart={addItemToCart} />
      </TableCell>
    </TableRowStyled>
  );
}
