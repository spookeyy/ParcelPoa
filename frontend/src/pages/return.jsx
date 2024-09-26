import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function Returns() {
  return (
    <>
    <Navbar />

    <div className="bg-white min-h-screen p-8">
      
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-yellow-500 p-8">
          <h1 className="text-3xl font-bold text-white">Returns Policy</h1>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
          <p className="mb-6 text-gray-700">
            We want you to be completely satisfied with your purchase. If you are not satisfied, you can return the product within 30 days of purchase.
          </p>
          <h3 className="text-xl font-bold mb-2">Eligibility</h3>
          <p className="mb-4 text-gray-700">
            To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
          </p>
          <h3 className="text-xl font-bold mb-2">Refunds</h3>
          <p className="mb-4 text-gray-700">
            Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment.
          </p>
          <h3 className="text-xl font-bold mb-2">Exchanges</h3>
          <p className="mb-4 text-gray-700">
            We only replace items if they are defective or damaged. If you need to exchange it for the same item, contact us.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
