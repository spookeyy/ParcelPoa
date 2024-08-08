# ParcelPoa Delivery System
 ParcelPoa is an online delivery system designed for seamless interaction between three primary users: Seller, Agent, and Buyer. The system ensures that goods are tracked throughout the delivery process, providing transparency and reliability for all parties involved.

# Table of Contents
 Contributors
  User Roles
   Seller
   Agent
   Buyer
System Commands
  Installation
Usage
 API Documentation
 Testing
 Contributing
License

 ## Contributors

   This project is developed and maintained by the following contributors:
     Name:Meshack Pangas
     Email:pangasmeshack@gmail.com
     Phone:+254793057720
     Name:Whitney Shisia
     Email:
     Phone:+254705719325
     Name:Scarlet Sarah
     Email:sarahscarlet641@gmail.com
     Phone:+254704372525
     Name:Peter Mbugua
     Email:pmbugua276@gmail.com
     Phone:+254701571745
     Name:Simon Mwaura
     Email:
     Phone:+254715333522

 # User Roles

#### Seller

   Responsible for listing goods and managing inventory.

#### Agent

   Facilitates the delivery process and tracks shipments.

#### Buyer

   Places orders and tracks their deliveries.

### System Commands

#### Seller Commands
 addProduct(productDetails): Adds a new product to the inventory.
 updateProduct(productId, updatedDetails): Updates the details of an existing product.
 removeProduct(productId): Removes a product from the inventory.
 viewProducts(): Displays all available products.
 
#### Agent Commands
 assignDelivery(orderId, agentId): Assigns a delivery to an agent.
 updateDeliveryStatus(orderId, status): Updates the status of a delivery (e.g., in transit, delivered).
 trackDelivery(orderId): Provides current tracking information for a delivery.

#### Buyer Commands
 placeOrder(productId, quantity): Places a new order for a product.
 cancelOrder(orderId): Cancels an existing order.
 viewOrderStatus(orderId): Checks the status of an order.

### Installation
 To set up the ParcelPoa system locally, follow these steps:
 Clone the repository:

 bash
 git clone https://github.com/Spookey/ParcelPoa.git

Navigate to the project directory:

 bash
 cd ParcelPoa

Install the required dependencies:

 bash
 npm install

Start the server:

 bash
 npm start

### Usage

 Once the server is running, users can interact with the system through the provided commands based on their roles. Ensure that you have the necessary permissions to execute specific commands.

#### API Documentation

The ParcelPoa system provides a RESTful API for interacting with the system. You can find the detailed API documentation in the docs directory or by visiting the project's website.
Testing
ParcelPoa has a comprehensive test suite to ensure the reliability and correctness of the system. To run the tests, use the following command:

 bash
 npm test

### Contributing

We welcome contributions from the community. If you would like to contribute to ParcelPoa, please follow these steps:

 Fork the repository.
 Create a new branch for your feature or bug fix.
 Make your changes and commit them with descriptive messages.
 Push your changes to your forked repository.
 Submit a pull request to the main repository.
Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

### License
This project is licensed under the MIT License. See the LICENSE file for more details.