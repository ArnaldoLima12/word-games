'use client'

import { useState, useRef } from "react";

export default function FormNewGame({categorias}) {   

    const [resultado, setResultado] = useState(null);
    const formRef = useRef(null);

    const submit = async (e) => {
        
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        let res = await fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                titulo: form.get('titulo'),
                categoria: form.get('categoria'),
                id: form.get('id'),
                download: form.get('download'),
                descricao: form.get('descricao'),
                formato: form.get('formato'),
                iso: form.get('iso'),
                plataforma: form.get('plataforma'),
                tamanho: form.get('tamanho'),
                capa: await convertToBase64(form.get('capa'))
            }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();

        if (res.ok) {

            setResultado({status: true, message: data.message});
            formRef.current.reset();

        } else {
            
            setResultado({status: false, message: data.message})
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                if (!base64String) {
                    reject(new Error('Failed to convert image to base64'));
                } else {
                    resolve(base64String);
                }
            };
            reader.onerror = error => reject(error);
        });
    }
    

    return (
        <form ref={formRef} onSubmit={submit} encType="multipart/form-data">
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="titulo" className="text-sm font-medium text-gray-900 block mb-2">Titulo</label>
                    <input type="text" name="titulo" id="titulo" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="God of War" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Categoria</label>
                    <select name="categoria" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                        <option defaultValue={''}></option>
                        {categorias.categorias.map( categoria => (
                            <option key={categoria.id} defaultValue={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>
                   
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="id" className="text-sm font-medium text-gray-900 block mb-2">ISO ID</label>
                    <input type="text" name="iso" id="iso" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="BLES[0000]" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="tamanho" className="text-sm font-medium text-gray-900 block mb-2">Tamanho</label>
                    <input type="text" name="tamanho" id="tamanho" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="21" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="plataforma" className="text-sm font-medium text-gray-900 block mb-2">Platafoma</label>
                    <select name="plataforma" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
                        <option defaultValue={''}></option>
                        <option value={'PS2'}>PS2</option>
                        <option value={'PS3'}>PS3</option>
                    </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="download" className="text-sm font-medium text-gray-900 block mb-2">Download</label>
                    <input type="text" name="download" id="download" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="formato" className="text-sm font-medium text-gray-900 block mb-2">Formato</label>
                    <input type="text" name="formato" id="formato" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="" required />
                </div>

                <div className="col-span-full">
                    <label htmlFor="descricao" className="text-sm font-medium text-gray-900 block mb-2">Descrição</label>
                    <textarea id="descricao" name="descricao" rows="6" cols={2} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Descrição..."></textarea>
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="capa" className="text-sm font-medium text-gray-900 block mb-2">Capa</label>
                    <input type="file" name="capa" id="capa" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="" required />
                </div>
                
                <div className="col-span-6 sm:col-span-3 flex items-center justify-end">
                    <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save all</button>
                </div>
            </div>

            {resultado && (
                <div className={`mt-4 p-4 rounded ${resultado.status ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {resultado.message}
                </div>
            )}
        </form>
    );
}
