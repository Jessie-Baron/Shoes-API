import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import * as shoeActions from "../../store/shoe";

function ShoeEditForm({setType, type, brand, setBrand, model, setModel, shoe_type, size, setSize, color, setColor, material, setMaterial, price, setPrice, setShowEdit, shoeId}) {
  console.log(shoeId, "this is the shoeId")
  const userId = useSelector((state) => state.session.user.id);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    // Create a new object for the body form information.
    const shoeForm = {
        type: type,
        brand: brand,
        model: model,
        shoe_type: shoe_type,
        size: size,
        color: color,
        material: material,
        price: price,
        shoeId: shoeId
    };


    await dispatch(shoeActions.fetchEditShoe(shoeForm))
    // await dispatch(shoeActions.fetchAllShoes())
    setShowEdit(false)


    // Reset the form state.
    setType("");
    setBrand("");
    setModel("");
    setType("");
    setSize("");
    setColor("");
    setMaterial("");
    setPrice("");
    setValidationErrors([]);
    setHasSubmitted(false);
  };

  return (
    <form id="form1" noValidate onSubmit={onSubmit}>
    <ul>
      {validationErrors.map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ul>
    <label>
                    Brand
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Model
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Size
                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Color
                    <input
                        type="password"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Material
                    <input
                        type="password"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        required
                    />
                </label>
                <label>
                    price
                    <input
                        type="test"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
    <button className='comment-button' type="submit">Respond</button>
  </form>
);
}

export default ShoeEditForm;
