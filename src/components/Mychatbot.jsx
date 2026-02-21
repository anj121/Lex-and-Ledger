import React from "react";
import ChatBot from "react-chatbotify";

const MyChatBot = () => {
  const [form, setForm] = React.useState({});
  
  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300
  };

  // Service categories data
  const serviceCategories = [
    {
      id: "company",
      title: "Company & Compliance",
      description: "Complete business formation and compliance solutions",
      services: [
        {
          id: 1,
          name: "Company Formation & Registration",
          price: "₹15,000",
          duration: "7-10 days",
          description: "Streamline your business setup with expert guidance on company formation and registration processes."
        },
        {
          id: 2,
          name: "Corporate Governance & Compliance",
          price: "₹25,000",
          duration: "15-20 days",
          description: "Maintain robust corporate governance standards and ensure ongoing regulatory compliance."
        },
        {
          id: 3,
          name: "Regulatory Compliance & Filings",
          price: "₹12,000",
          duration: "5-7 days",
          description: "Stay compliant with all regulatory requirements through timely and accurate filings."
        },
        {
          id: 4,
          name: "Company Incorporation",
          price: "₹18,000",
          duration: "10-15 days",
          description: "Complete incorporation services to establish your business as a recognized corporate entity."
        },
        {
          id: 5,
          name: "LLP Registration",
          price: "₹8,000",
          duration: "5-7 days",
          description: "Register your Limited Liability Partnership with full legal compliance and documentation."
        },
        {
          id: 6,
          name: "Compliance Officer Services",
          price: "₹30,000/month",
          duration: "Ongoing",
          description: "Professional compliance officer services to oversee regulatory adherence and risk management."
        }
      ]
    },
    {
      id: "tax",
      title: "Tax Services",
      description: "Comprehensive tax planning and compliance services",
      services: [
        {
          id: 7,
          name: "Tax Planning & Advisory",
          price: "₹10,000",
          duration: "3-5 days",
          description: "Strategic tax planning to optimize your financial efficiency and minimize tax burdens."
        },
        {
          id: 8,
          name: "Income Tax Return Filing",
          price: "₹2,500",
          duration: "1-2 days",
          description: "Expert assistance with accurate and timely income tax return preparation and filing."
        },
        {
          id: 9,
          name: "Tax Compliance & Reporting",
          price: "₹15,000",
          duration: "7-10 days",
          description: "Comprehensive tax compliance services to ensure adherence to all tax regulations."
        },
        {
          id: 10,
          name: "Tax Assessments & Appeals",
          price: "₹20,000",
          duration: "30-45 days",
          description: "Professional representation during tax assessments and appeals processes."
        },
        {
          id: 11,
          name: "Withholding Tax Compliance (TDS/TCS)",
          price: "₹8,000",
          duration: "3-5 days",
          description: "Complete TDS/TCS compliance services including calculation, deduction, and filing."
        },
        {
          id: 12,
          name: "Tax Consultant",
          price: "₹5,000/hour",
          duration: "As needed",
          description: "Expert tax consultation for complex tax matters and strategic financial planning."
        },
        {
          id: 13,
          name: "Income Tax – PAN",
          price: "₹500",
          duration: "1 day",
          description: "Assistance with PAN application and acquisition for tax identification purposes."
        },
        {
          id: 14,
          name: "Income Tax – TAN",
          price: "₹1,000",
          duration: "2-3 days",
          description: "TAN registration services for entities responsible for tax deduction at source."
        }
      ]
    },
    {
      id: "immediate",
      title: "Immediate Services",
      description: "Urgent legal and financial assistance within 10 minutes",
      services: [
        {
          id: 15,
          name: "Immediate Legal Service",
          price: "₹2,000",
          duration: "10 minutes",
          description: "Urgent legal consultation within 10 minutes"
        },
        {
          id: 16,
          name: "Immediate Lawyer Consultation",
          price: "₹1,500",
          duration: "10 minutes",
          description: "Quick lawyer consultation for immediate guidance"
        }
      ]
    },
    {
      id: "gst-services",
      title: "GST Services",
      description: "End-to-end GST compliance, filing, and advisory",
      services: [
        {
          id: 17,
          name: "GST Registration",
          price: "₹1,500",
          duration: "2-3 days",
          description: "Complete GST registration process to obtain your GSTIN for business operations."
        },
        {
          id: 18,
          name: "GST Advisory & Consultation",
          price: "₹3,000/hour",
          duration: "As needed",
          description: "Expert GST advisory services to navigate complex provisions and optimize compliance."
        },
        {
          id: 19,
          name: "GST Compliance & Filings",
          price: "₹2,500/month",
          duration: "Monthly",
          description: "Regular GST return filing and compliance management for seamless operations."
        },
        {
          id: 20,
          name: "GST Audit & Assessment",
          price: "₹10,000+",
          duration: "Depends on case",
          description: "Professional support during GST audits and assessments with expert representation."
        },
        {
          id: 21,
          name: "GST Refunds & Claims",
          price: "₹3,500",
          duration: "7-10 days",
          description: "Assistance with GST refund applications and claims processing for eligible businesses."
        },
        {
          id: 22,
          name: "GST Litigation & Appeals",
          price: "₹15,000+",
          duration: "As required",
          description: "Legal representation for GST disputes and appeals before authorities and tribunals."
        },
        {
          id: 23,
          name: "GST LUT Filing",
          price: "₹1,500",
          duration: "1-2 days",
          description: "Letter of Undertaking filing for exporters to conduct zero-rated supplies."
        }
      ]
    },
    {
      id: "startup-regulatory",
      title: "Startup & Regulatory",
      description: "Registrations and legal setup for new-age businesses",
      services: [
        {
          id: 24,
          name: "Startup India Registration",
          price: "₹3,000",
          duration: "3-5 days",
          description: "Complete Startup India registration to access government benefits and incentives."
        },
        {
          id: 25,
          name: "MSME / Udyam Registration",
          price: "₹1,000",
          duration: "1-2 days",
          description: "Udyam registration for MSMEs to leverage government schemes and benefits."
        },
        {
          id: 26,
          name: "IEC Codes",
          price: "₹2,000",
          duration: "2-3 days",
          description: "Import Export Code registration for businesses engaged in international trade."
        },
        {
          id: 27,
          name: "AD Code Registration",
          price: "₹1,500",
          duration: "2-3 days",
          description: "Authorized Dealer Code registration for streamlined export documentation."
        },
        {
          id: 28,
          name: "PF / ESIC Registration",
          price: "₹4,000",
          duration: "3-5 days",
          description: "Employee welfare registrations for Provident Fund and ESIC compliance."
        },
        {
          id: 29,
          name: "NGO / Trust / Section 8 Company Formation",
          price: "₹20,000",
          duration: "10-15 days",
          description: "Formation services for non-profit organizations and social enterprises."
        }
      ]
    },
    {
      id: "ma-restructuring",
      title: "M&A & Restructuring",
      description: "Business mergers, acquisitions and corporate restructuring",
      services: [
        {
          id: 30,
          name: "Mergers & Acquisitions (M&A)",
          price: "₹50,000+",
          duration: "Varies",
          description: "End-to-end M&A services including due diligence, negotiation, and integration."
        },
        {
          id: 31,
          name: "Corporate Restructuring & Insolvency",
          price: "₹75,000+",
          duration: "Varies",
          description: "Corporate restructuring and insolvency resolution services for distressed businesses."
        }
      ]
    }
  ];
  const flow = {
    start: {
      message: "👋 Welcome to Lex&Ledger! Let's get started. What is your name?",
      function: (params) => setForm((prev) => ({ ...prev, name: params.userInput })),
      path: "ask_email"
    },
    ask_email: {
      message: (params) => `Hi ${form.name || params.userInput}, may I know your email?`,
      function: (params) => setForm((prev) => ({ ...prev, email: params.userInput })),
      path: "ask_phone"
    },
    ask_phone: {
      message: "Great! What's your phone number?",
      function: (params) => setForm((prev) => ({ ...prev, phone: params.userInput })),
      path: "ask_state"
    },
    ask_state: {
      message: "Which state are you from?",
      function: (params) => setForm((prev) => ({ ...prev, state: params.userInput })),
      path: "ask_category"
    },
    ask_category: {
      message: "Which service category are you interested in?",
      options: serviceCategories.map(category => category.title),
      function: (params) => {
        const selectedCategory = serviceCategories.find(cat => cat.title === params.userInput);
        if (selectedCategory) {
          setForm((prev) => ({ 
            ...prev, 
            category: selectedCategory.title,
            categoryId: selectedCategory.id,
            selectedCategoryData: selectedCategory
          }));
        }
      },
      path: (params) => {
        const selectedCategory = serviceCategories.find(cat => cat.title === params.userInput);
        if (selectedCategory?.title === "Company & Compliance") return "company_services";
        if (selectedCategory?.title === "Tax Services") return "tax_services";
        if (selectedCategory?.title === "Immediate Services") return "immediate_services";
        if (selectedCategory?.title === "GST Services") return "gst_services";
        if (selectedCategory?.title === "Startup & Regulatory") return "startup_services";
        if (selectedCategory?.title === "M&A & Restructuring") return "ma_services";
        return "show_services";
      }
    },
    company_services: {
      message: "Great choice! Here are the Company & Compliance services. Click on any service to get started:",
      component: (params) => {
        const selectedCategory = serviceCategories.find(cat => cat.title === "Company & Compliance");
        return (
          <div style={{ marginTop: 10, marginLeft: 20, maxWidth: 300 }}>
            {selectedCategory?.services.map((service, index) => (
              <div key={service.id} style={{ marginBottom: 8 }}>
                <a
                  href={`/getStarted/${selectedCategory.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    color: '#0ea5e9',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0ea5e9';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f0f9ff';
                    e.target.style.color = '#0ea5e9';
                  }}
                >
                  {service.name} - {service.price}
                </a>
              </div>
            ))}
          </div>
        );
      },
      options: ["Select Another Category", "Start New Query"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Select Another Category") return "ask_category";
        return "start";
      }
    },
    tax_services: {
      message: "Great choice! Here are the Tax Services. Click on any service to get started:",
      component: (params) => {
        const selectedCategory = serviceCategories.find(cat => cat.title === "Tax Services");
        return (
          <div style={{ marginTop: 10, marginLeft: 20, maxWidth: 300 }}>
            {selectedCategory?.services.map((service, index) => (
              <div key={service.id} style={{ marginBottom: 8 }}>
                <a
                 href={`/getStarted/${selectedCategory.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    color: '#0ea5e9',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0ea5e9';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f0f9ff';
                    e.target.style.color = '#0ea5e9';
                  }}
                >
                  {service.name} - {service.price}
                </a>
              </div>
            ))}
          </div>
        );
      },
      options: ["Select Another Category", "Start New Query"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Select Another Category") return "ask_category";
        return "start";
      }
    },
    immediate_services: {
      message: "Great choice! Here are the Immediate Services. Click on any service to get started:",
      component: (params) => {
        const selectedCategory = serviceCategories.find(cat => cat.title === "Immediate Services");
        return (
          <div style={{ marginTop: 10, marginLeft: 20, maxWidth: 300 }}>
            {selectedCategory?.services.map((service, index) => (
              <div key={service.id} style={{ marginBottom: 8 }}>
                <a
                  href={`/immediate-service`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    color: '#0ea5e9',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0ea5e9';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f0f9ff';
                    e.target.style.color = '#0ea5e9';
                  }}
                >
                  {service.name} - {service.price}
                </a>
              </div>
            ))}
          </div>
        );
      },
      options: ["Select Another Category", "Start New Query"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Select Another Category") return "ask_category";
        return "start";
      }
    },
    gst_services: {
      message: "Great choice! Here are the GST Services. Click on any service to get started:",
      component: (params) => {
        const selectedCategory = serviceCategories.find(cat => cat.title === "GST Services");
        return (
          <div style={{ marginTop: 10, marginLeft: 20, maxWidth: 300 }}>
            {selectedCategory?.services.map((service, index) => (
              <div key={service.id} style={{ marginBottom: 8 }}>
                <a
                                   href={`/getStarted/${selectedCategory.id}`}

                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    color: '#0ea5e9',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0ea5e9';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f0f9ff';
                    e.target.style.color = '#0ea5e9';
                  }}
                >
                  {service.name} - {service.price}
                </a>
              </div>
            ))}
          </div>
        );
      },
      options: ["Select Another Category", "Start New Query"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Select Another Category") return "ask_category";
        return "start";
      }
    },
    startup_services: {
      message: "Great choice! Here are the Startup & Regulatory services. Click on any service to get started:",
      component: (params) => {
        const selectedCategory = serviceCategories.find(cat => cat.title === "Startup & Regulatory");
        return (
          <div style={{ marginTop: 10, marginLeft: 20, maxWidth: 300 }}>
            {selectedCategory?.services.map((service, index) => (
              <div key={service.id} style={{ marginBottom: 8 }}>
                <a
                                  // href={`/getStarted/${selectedCategory.id}`}

                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    color: '#0ea5e9',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0ea5e9';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f0f9ff';
                    e.target.style.color = '#0ea5e9';
                  }}
                >
                  {service.name} - {service.price}
                </a>
              </div>
            ))}
          </div>
        );
      },
      options: ["Select Another Category", "Start New Query"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Select Another Category") return "ask_category";
        return "start";
      }
    },
    ma_services: {
      message: "Great choice! Here are the M&A & Restructuring services. Click on any service to get started:",
      component: (params) => {
        const selectedCategory = serviceCategories.find(cat => cat.title === "M&A & Restructuring");
        return (
          <div style={{ marginTop: 10, marginLeft: 20, maxWidth: 300 }}>
            {selectedCategory?.services.map((service, index) => (
              <div key={service.id} style={{ marginBottom: 8 }}>
                <a
                                 href={`/getStarted/${selectedCategory.id}`}

                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    color: '#0ea5e9',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0ea5e9';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f0f9ff';
                    e.target.style.color = '#0ea5e9';
                  }}
                >
                  {service.name} - {service.price}
                </a>
              </div>
            ))}
          </div>
        );
      },
      options: ["Select Another Category", "Start New Query"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Select Another Category") return "ask_category";
        return "start";
      }
    }
  };

  return <ChatBot flow={flow}     settings={{
      // general: {
      //   embedded: true
      // },
      header: {
        title: "Lex&Ledger Assistant",
        showAvatar: true
      }
    }}
/>;
};

export default MyChatBot;
