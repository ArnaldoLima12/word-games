'use client'

export default function FormNewGame() {   

    const submit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const data = {
            titulo: form.get('titulo'),
            categoria: form.get('categoria'),
            id: form.get('id'),
            download: form.get('download'),
            descricao: form.get('descricao'),
            capa: await convertToBase64(form.get('capa')) // Converte a imagem para base64
        }

        let res = await fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        if (res.ok) {
            console.log('Form submitted successfully');
        } else {
            console.log('Error submitting form');
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
        <form onSubmit={submit} encType="multipart/form-data">
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="titulo" className="text-sm font-medium text-gray-900 block mb-2">Titulo</label>
                    <input type="text" name="titulo" id="titulo" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="God of War" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Categoria</label>
                    <input type="text" name="categoria" id="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="RPG" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="brand" className="text-sm font-medium text-gray-900 block mb-2">ISO ID</label>
                    <input type="text" name="id" id="brand" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="BLES[0000]" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Download</label>
                    <input type="text" name="download" id="download" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="" required />
                </div>

                <div className="col-span-full">
                    <label htmlFor="descricao" className="text-sm font-medium text-gray-900 block mb-2">Descrição</label>
                    <textarea id="descricao" name="descricao" rows="6" cols={2} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Descrição..."></textarea>
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="capa" className="text-sm font-medium text-gray-900 block mb-2">Capa</label>
                    <input type="file" name="capa" id="capa" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="" required />
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                    <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save all</button>
                </div>
            </div>
        </form>
    );
}
