"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { GoogleGenerativeAI } from '@google/generative-ai'

const MainContainer = () => {

    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState("")

    const handleImageUpload = (e) => {
        if(e.target.files && e.target.files[0]){
            // console.log(e.target.files[0]);
            setImage(e.target.files[0])
        }
    }

    const identifyImage = async(additionalPrompts) => {
        if(!image) return;

        setLoading(true)

        const genAI = new GoogleGenerativeAI(
            process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
        )

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        try {

            const imageParts = await fileToGenerativePart(image)
            const results = await model.generateContent([
                `Identify the image and provides its name and important informations
                including a brief explaination about that image. ${additionalPrompts}`,
                imageParts
            ])

            const response = await results.response;
            const text = response.text().trim()
            .replace(/```/g, "")
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/-\s*/g, "")
            .replace(/\n\s*\n/g, "\n")
            setResult(text)            
        } catch (error) {
            console.log(error?.message)
        } finally {
            setLoading(false)
        }

    }

    const fileToGenerativePart = async(file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64Data = reader.result;
                const base64Content = base64Data.split(',')[1]
                resolve({
                    inlineData: {
                        data: base64Content,
                        mimeType: file.type
                    }
                })
            }
            reader.onerror = reject;
            reader.readAsDataURL(file);
        })
    }

    
  return (
    <main className={"max-w-7xl mx-auto p-4 sm:px-6 lg:px-8"}>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
                <h2 className="text-3xl font-semibold text-gray-600 mb-8 
                text-center hover:text-blue-600">
                    Identify your Image
                </h2>
                <div className="mb-8">
                    <label 
                    htmlFor="image-upload" 
                    className="block text-sm font-medium text-gray-700 mb-2">
                        Upload an image
                    </label>
                    <input 
                    type="file" 
                    id="image-upload" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm to-gray-500 file:mr-4
                    file:py-2 file:px-4 file:rounded-full file:border-0
                    file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-500
                    hover:file:bg-blue-100 transition duration-500 ease-in-out"
                    />
                </div>

                {/* display the image */}
                
                {image && (
                    <div className="mb-8 flex justify-center">
                        <Image
                            src={URL.createObjectURL(image)}
                            alt="Uploaded Image"
                            width={300}
                            height={300}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                )}
                <button
                 type="button"
                 onClick={() => identifyImage("with captions")}
                 disabled={ !image || loading } 
                 className="w-full bg-blue-600 text-white
                 py-3 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-medium
                 text-lg">
                    {loading? "Identifying..." : "Identify image"}
                </button>
            </div>
            {result && (
                <div className="bg-blue-100 p-8 border-t border-blue-200">
                    <h3 className="text-2xl font-bold text-blue-800 mb-8">Image Infromation</h3>
                    <div className="max-w-none">
                        {result.split("/n").map((line, index) => {
                            if(line.startsWith("Important Information:") || line.startsWith("Other Information:")){
                                return (
                                    <h4 className="text-xl font-semibold mt-4 mb-2
                                    text-blue-700" key={index}>{line}</h4>
                                )
                            }
                            else if (line.match(/^\d+\./) || line.startsWith("-")){
                                return (
                                    <p key={index} className="ml-4 mb-2 text-gray-700">{line}</p>
                                )
                            }
                            else if (line.trim() !== ""){
                                return(
                                    <p key={index} className="mb-2 text-gray-800">{line}</p>
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}
        </div>
        {/* how it works */}
        <section id="how-it-works" className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Upload Image", "AI Analysis", "Get Results"].map(
              (step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {step}
                  </h3>
                  <p className="text-gray-600">
                    Our advanced AI analyzes your uploaded image and provides
                    detailed information about its contents.
                  </p>
                </div>
              )
            )}
          </div>
        </section>
        {/* feature */}
        <section id="features" className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Accurate Identification",
              "Detailed Information",
              "Fast Results",
              "User-Friendly Interface",
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  {feature}
                </h3>
                <p className="text-gray-600">
                  Our image identifier provides quick and accurate results with
                  a simple, easy-to-use interface.
                </p>
              </div>
            ))}
          </div>
        </section>
    </main>
  )
}

export default MainContainer