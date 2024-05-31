'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function FormLogin() {
  const [error, setError] = useState(null);

  async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const res = await signIn('credentials', { ...data, redirect: false });

    if (res.error) {
      setError(res.error);
    } else {
      window.location.href = '/admin';
    }
  }

  return (
    <form className="max-w-sm mx-auto bg-black p-4 rounded-md" onSubmit={login}>
      {error && <div className="mb-3 text-red-500">{error}</div>}
      <div className="mb-3">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>
    </form>
  );
}
