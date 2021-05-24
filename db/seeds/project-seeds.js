const { post } = require('../../controllers');
const { Project } = require('../models');

const projectdata = [
    {
        project_id: "12345",
        client_first_name: "ricardo",
        client_last_name: "limon",
        client_company: "limon auto",
        contract_signed: true,
        date_contract_created: 
            {
                createdAt: Date.now()
            },
        date_contract_signed: 
            {
                updatedAt: Date.now()
            },
        project_title: "Limon Auto Website and Branding",
        project_description: "full graphic design with brandboard and a website with site navigation using html, css, and javascript",
        services_rendered: 
            [
                {
                    service_rendered: "front-end web development",
                    service_rendered_description: "fully integrated and responsive website built on wordpress engine. Has a full navigation bar, up to 5 pages and a footer."
                },
                {
                    service_rendered: "graphic design",
                    service_rendered_description: "complete brand board with company branded colors and typography, and logo design"
                }
            ],
            //DateTime.new (yyyy, m, date, hour)
        project_start_date: DateTime.new(2021, 7, 1, 0),
        project_completion_date: DateTime.new(2021, 7 , 14 ,0),
        total_price_of_project: 5000.00,
        fee_schedule: "paid in full",
        length_of_project: "2 weeks"
    }
];

const seedProject = () => Project.bultCreate(projectdata);

module.exports = seedProject;