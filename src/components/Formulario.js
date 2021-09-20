import React, {useState} from 'react';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    
    const [presupuesto, guardarPresupuesto] = useState({
        nombre: "",
        cantidad: 0
    })

    const [error, guardarError] = useState(false)

    const ObtenerPresupuesto = e => {
        guardarPresupuesto({
           ...presupuesto,
           [e.target.name] : e.target.value
        })
    }

    const {nombre, cantidad} = presupuesto;

    const agregarPresupuesto = e => {
        e.preventDefault();
        
        if(nombre.trim() === "" || cantidad < 1 || isNaN(cantidad)){
           
            guardarError(true)
            return;
        }
        Number(cantidad)
        guardarError(false)

        //crear el nuevo gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        guardarGasto(gasto)
        guardarCrearGasto(true)

        guardarPresupuesto({
            nombre: '',
            cantidad: 0
        })
    }

    return ( 
        <form onSubmit={agregarPresupuesto}>
            <h2>Agrega tus gastos aqui</h2>
            {error ? <Error mensaje="Ambos campo son obligatorios o Presupuesto Incorrecto"/> : null}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    name="nombre"
                    value={nombre}
                    onChange={ObtenerPresupuesto}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    name="cantidad"
                    value={cantidad}
                    onChange={ObtenerPresupuesto}
                />
            </div>

            <input
                type="submit"
                className="button-primary i-full-width"
                value="Agregar Gasto"
            />
        </form>
     );
}
 
export default Formulario;