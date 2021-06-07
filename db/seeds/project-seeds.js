const { Project } = require('../../models');

const projectdata = [
    {
        project_title: "Limon Auto Body Website and Branding",
        project_description: "full graphic design with brandboard and a website with site navigation using html, css, and javascript",
        services_rendered: "front-end web development & graphic design",
        services_rendered_description: "Fully integrated and responsive website built on wordpress engine. Has a full navigation bar, up to 5 pages and a footer. Also, complete brand board with company branded colors and typography, and logo design",
        project_start_date: new Date(Date.UTC(2016, 1, 1)),
        project_completion_date: new Date(Date.UTC(2016, 1, 1)),
        total_price_of_project: 5000.00,
        fee_schedule: "paid in full",
        length_of_project: "2 weeks",
        client_first_name: "Ricardo",
        client_last_name: "Limon",
        client_email_address: "rlimon@limonauto.com",
        client_company_name: "Limon Auto Body and Collision",
        client_billing_address: "74 4th street",
        client_city: "Nashville",
        client_zipcode: 37203,
        contract_signed: true,
        // new date UTC YYYY, MM, DD
        contract_created_date: new Date(Date.UTC(2021, 30, 3)),
        contract_signed_date: new Date(Date.UTC(2021, 1, 4)),
        user_id: 1
    },
    {
        project_title: "Lana Del Ray Website",
        project_description: "full graphic design with brandboard and a website with site navigation using html, css, and javascript",
        services_rendered: "front-end web development & graphic design",
        services_rendered_description: "Fully integrated and responsive website built on wordpress engine. Has a full navigation bar, up to 5 pages and a footer. Also, complete brand board with company branded colors and typography, and logo design",
        project_start_date: new Date(Date.UTC(2021, 6, 1)),
        project_completion_date: new Date(Date.UTC(2021, 7, 1)),
        total_price_of_project: 10000.00,
        fee_schedule: "paid in full",
        length_of_project: "one month",
        client_first_name: "Lana",
        client_last_name: "Del Ray",
        client_email_address: "Lana@lanadelray.com",
        client_company_name: "Lana Del Ray and Friends",
        client_billing_address: "123 Summertime Sadness",
        client_city: "Los Angeles",
        client_zipcode: 90210,
        contract_signed: true,
        // new date UTC YYYY, MM, DD
        contract_created_date: new Date(Date.UTC(2021, 5, 27)),
        contract_signed_date: new Date(Date.UTC(2021, 5, 28)),
        user_id: 2
    }
];

const seedProject = () => Project.bulkCreate(projectdata);

module.exports = seedProject;