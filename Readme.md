<h1>Web site for dentistry</h1>
<h2>About progect</h2>
<p>This project is a coursework for the university created by two students: <a href="https://github.com/yanakapura">Yana Kapura</a> and <a href="https://github.com/ValeriaTripuz">Valeria Tripuz</a>.</p>
<p>The main tasks were:</p>
<ol>
  <li>A client-server application</li>
  <li>Connecting to a MySQL database</li>
  <li>Registration and authorization of users</li>
  <li>Ability to leave feedback</li>
  <li>Ability of making an appointment</li>
  <li>Ability to view reviews from other patients</li>
  <li>Ability to view reference information about the schedule of doctors</li>
  <li>
    Ability to view reference information about the services provided and their
    cost
  </li>
</ol>

<p>As a result, all the tasks were completed.</p>
<p>
  A MySQL database was created (the dentistry.sql file for installing the
  database is contained in the project) The server (server folder) is created on
  Node.js, it connects to BD and processes user requests.
</p>
<figure>
  <img src="readme/img-1.png" alt="server creation" />
  <figcaption>Server creation</figcaption>
</figure>

<figure>
  <img src="readme/img-2.png" alt="connection to db" />
  <figcaption>Database connection</figcaption>
</figure>

<p>
  The dentistry website contains the main page, the "About us" page, the
  "Services" page, the "Contacts" page, as well as the user's personal page.
</p>

<figure>
  <img src="readme/img-3.png" alt="main page" style="width: 600px" />
  <figcaption>Main page</figcaption>
</figure>

<p>
  Page "About us" contains information about the company, a gallery of doctors
  with information about them, customer reviews, as well as a feedback form.
  Information about doctors and comments are requested from the database. New
  comments are added to the database
</p>
<figure>
  <img src="readme/about.jpg" alt="page 'about'" style="width: 600px" />
  <figcaption>page "About us"</figcaption>
</figure>

<p>
  The "Services" page contains information about the services provided and
  prices for them (data is requested from the database) and including an
  appointment form (data is responsing to the database).
</p>
<i>(Background image is fixed)</i>
<figure>
  <img src="readme/services.jpg" alt="page 'about'" style="width: 600px" />
  <figcaption>page "Services"</figcaption>
</figure>

<p>The "Contacts" page contains company's contacts and imported Google map</p>
<figure>
  <img src="readme/img-5.png" alt="page 'about'" style="width: 600px" />
  <figcaption>page "Contacts"</figcaption>
</figure>

<p>
  The user's personal page contains information about the client, his name,
  email, and all his records received from the database. There is also a logout
  button on the page.
</p>
<figure>
  <img src="readme/img-6.png" alt="page 'about'" style="width: 600px" />
  <figcaption>User's personal page</figcaption>
</figure>

<p>If the client cannot connect/loses connection to the server, the following message is displayed on the screen: "Unable to connect to the server"</p>
<img src="readme/img-7.png" alt="Unable to connect to the server" style="width: 600px">

<h2>How to install</h2>

<p>To install the project, you need:</p>
<ol>
  <li>Download the zip with the project from GitHub.</li>
  <li>Install the database from the file dentistry.sql.</li>
  <li>Connect to DB by changing the password to connect on the server to your own.</li>
  <li>Start the server with the console command "node server.js"</li>
  <li>Start the client (index.html) in the browser</li>
</ol>
