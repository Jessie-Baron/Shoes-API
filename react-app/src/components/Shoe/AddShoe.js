import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import * as shoeActions from "../../store/shoe";


const UploadShoe = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [img_url, setImgUrl] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState("");
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [material, setMaterial] = useState("");
    const [price, setPrice] = useState('');


    const handleSubmit = async (e) => {

        const shoe = {
            img_url,
            brand,
            model,
            type,
            size,
            color,
            material,
            price
        }

        await dispatch(shoeActions.fetchPostShoe(shoe))
            .then(history.push(`/`))
    }

    return (
        <div>
            <h2>
                Upload a Shoe
            </h2>
            <form onSubmit={handleSubmit}>
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
                <label>
                Paste an Image URL
                    <input
                        type="test"
                        value={img_url}
                        onChange={(e) => setImgUrl(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Upload</button>
            </form>

        </div>)

}

export default UploadShoe;
