// FormComponent.js
import React, { useState, useEffect } from 'react';
import { useMoralis } from "react-moralis";
// import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { contractABI, contract_address } from "../../contracts/NewContractDetails.js";
import BigNumber from 'bignumber.js';


const FormComponent = ({ setForm, asset_id, location, asset_type, govt_price }) => {
    const { enableWeb3, account, isWeb3Enabled } = useMoralis()
    const [formData, setFormData] = useState({
        area: '',
        governmentRice: '',
        markedPrice: '',
        tokenPrize: '',
        dueDate: '',
        agreeTerms: false,
    });

    const [priceOffered, setPriceOffered] = useState();

    const [propId, setPropId] = useState(0);

    useEffect(() => {
        console.log("HI")
        if (isWeb3Enabled) {
            console.log(account);
        }
        enableWeb3()

    }, [isWeb3Enabled])
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    const { runContractFunction: fundInitial } = useWeb3Contract({
        abi: contractABI,
        contractAddress: contract_address,
        functionName: "fundInitial",
        params: { "propertyId": asset_id },//state variable update
        msgValue: "100000000000000000"//state variable update
    });

    //   useEffect(() => {
    //         console.log("priceOffered",priceOffered)
    //     },[priceOffered])



    useEffect(() => {
        console.log("ye to hoja pls")
        console.log("propId", propId)
    }, [propId])



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform your form submission logic here
        setForm(false);
        console.log(asset_id)
        setPropId(asset_id)

        console.log(formData);
        const maticAmountString = "0.1";
        const decimals = 18;

        // Convert the string to a BigNumber
        const maticAmount = new BigNumber(maticAmountString);

        // Calculate the equivalent amount in wei
        const weiAmount = maticAmount.times(new BigNumber(10).pow(decimals));

        // Format the result as a string
        const weiAmountString = weiAmount.toFixed(0);
        setPriceOffered(weiAmountString)
        // console.log(priceOffered)

        console.log(weiAmountString);  // Output: "200000000000000000"

        await fundInitial();
        console.log("bid submitted successful")

    };

    const close = () => {
        setForm(false);
    }

    return (

        <form onSubmit={handleSubmit} className="w-3/4 h-fit p-12 mx-auto flex flex-col ">


            <div className="text-xl font-bold  bg-red-600">
                Asset id : {asset_id}
                <br></br>


                Description : {govt_price}
                <br></br>
                Asset Type : {asset_type}
                <br></br>
                Asset Location : {location}
            </div>

            {/* <div className="mt-4">
                <label className="block">
                    Area:
                    <br />
                    <input type="text" name="area" value={formData.area} onChange={handleChange} className="border p-1" />
                </label>
            </div> */}

            {/* <div className="mt-4">
                <label className="block">
                    Government Price:
                    <br />
                    <input type="text" name="governmentRice" value={formData.governmentRice} onChange={handleChange} className="border p-1" />
                </label>
            </div> */}

            <div className="mt-4">
                <label className="flex flex-col items-center gap-2">
                    Place Your Price :
                    <br />
                    <input type="text" name="markedPrice" value={formData.markedPrice} onChange={handleChange} className="border p-1 text-black" />
                </label>
            </div>

            <div className="mt-4">
                <label className=" flex justify-center">
                    <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mr-2" />
                    I agree to the terms and conditions
                </label>
            </div>

            <div className="mt-4">
                <button type="submit" className="bg-blue-500 text-white p-2 px-3 rounded-xl">

                    Create Bid
                </button>
                <button onClick={() => { close }} className="text-white p-2 px-4 ml-4 rounded-xl bg-red-600">Close</button>

            </div>
        </form>

    );
};

export default FormComponent;
