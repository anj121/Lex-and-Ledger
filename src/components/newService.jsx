
import { useState ,useEffect} from 'react'
import '../App'
import { useParams } from 'react-router-dom';
import { serviceCategories } from '@/static/service-data';

export function ServiceDetailPage() {
  const [activeAccordion, setActiveAccordion] = useState(null)
  const [serviceData, setSelectedService] = useState(null);
    const { serviceId: routeServiceId } = useParams();
  const { categoryId: routeCategoryId } = useParams();

  useEffect(() => {
      const serviceId = sessionStorage.getItem("serviceId");
      const categoryId = sessionStorage.getItem("serviceCategoryId");
      const step = sessionStorage.getItem("bookingStep");
  
      if (routeServiceId) {
        const category = serviceCategories.find(cat => cat.id === routeCategoryId);
        const selectedService=category.services.find((ser)=>ser.id.toString()===serviceId.toString());
        if (category && category.services.length > 0) {
          setSelectedService({...selectedService,categoryTitle:category.title}); 
              window.scrollTo({ top: 0, behavior: "smooth" });
  
        }
        return; 
      }
  
      // Normal booking session logic
  
      if (serviceId && categoryId) {
        const category = serviceCategories.find(cat => cat.id === categoryId);
        if (category) {
          const service = category.services.find(srv => srv.id === parseInt(serviceId));
          if (service) setSelectedService({...service,categoryTitle:category.title});
        }
      }
    }, [routeServiceId]);
const parsePrice = (priceStr) => {
  try {
    if (typeof priceStr !== 'string') {
      throw new TypeError('Input must be a string');
    }

    const match = priceStr.match(/₹([\d,]+)/);
    if (!match) {
      throw new Error('Price format is invalid or missing ₹ symbol');
    }

    const numericValue = parseInt(match[1].replace(/,/g, ""), 10);
    if (isNaN(numericValue)) {
      throw new Error('Parsed value is not a valid number');
    }

    return numericValue;
  } catch (error) {
    console.error(`parsePrice error: ${error.message}`);
    return null;
  }
};

const originalPriceStr = serviceData?.price||""; 
const originalPrice = parsePrice(originalPriceStr); 
const discountAmount = Math.round(originalPrice * 0.24); 
const finalPrice = originalPrice - discountAmount;

const formatRupees = (amount) => {
  try {
    if (amount === null || amount === undefined) {
      throw new Error("Amount is null or undefined");
    }

    const num = Number(amount);

    if (isNaN(num)) {
      throw new TypeError("Amount must be a valid number or numeric string");
    }

    return "₹" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    console.error(`formatRupees error: ${error.message}`);
    return null;
  }
};

const suffix = originalPriceStr?originalPriceStr.includes("/month") ? "/month" : "":"";

  const keyFeatures = [
    {
      number: 1,
      title: "Name Reservation",
      description: "Secure your preferred company name with official reservation"
    },
    {
      number: 2,
      title: "Legal Documentation",
      description: "Complete preparation of MOA, AOA, and other legal documents"
    },
    {
      number: 3,
      title: "Government Filing",
      description: "Submit applications to ROC and handle all government procedures"
    },
    {
      number: 4,
      title: "Certificate Delivery",
      description: "Receive your Certificate of Incorporation and other documents"
    }
  ]

  const processSteps = [
    {
      number: 1,
      title: "Initial Consultation",
      description: "Discuss your business requirements and choose the right company structure (Private Limited, LLP, etc.)"
    },
    {
      number: 2,
      title: "Name Approval",
      description: "Submit name application to MCA and get approval for your preferred company name"
    },
    {
      number: 3,
      title: "Document Preparation",
      description: "Prepare and draft all required legal documents including MOA, AOA, and board resolutions"
    },
    {
      number: 4,
      title: "Digital Signature",
      description: "Obtain Digital Signature Certificate (DSC) for directors and complete DIN applications"
    },
    {
      number: 5,
      title: "Government Filing",
      description: "File incorporation documents with ROC and track application status"
    },
    {
      number: 6,
      title: "Certificate & Compliance",
      description: "Receive Certificate of Incorporation and set up initial compliance requirements"
    }
  ]

  const timeline = [
    {
      number: 1,
      title: "Name Reservation",
      duration: "1-2 business days"
    },
    {
      number: 2,
      title: "Document Preparation",
      duration: "2-3 business days"
    },
    {
      number: 3,
      title: "DSC & DIN Processing",
      duration: "3-5 business days"
    },
    {
      number: 4,
      title: "Government Filing & Approval",
      duration: "7-10 business days"
    },
    {
      number: "✓",
      title: "Total Duration",
      duration: "15-20 business days"
    }
  ]

  const eligibilityItems = [
    "Indian Citizens: Any Indian citizen above 18 years of age can be a director",
    "Foreign Nationals: Foreign citizens can be directors with proper documentation",
    "Minimum Directors: At least 2 directors required for Private Limited Company",
    "Minimum Shareholders: At least 2 shareholders required (can be same as directors)",
    "Minimum Capital: No minimum paid-up capital requirement",
    "Registered Office: Must have a registered office address in India",
    "Business Activity: Must have a legitimate business purpose and activity"
  ]

  const faqItems = [
    {
      question: "What is the difference between Private Limited and Public Limited Company?",
      answer: "A Private Limited Company has restrictions on share transfer and cannot invite public to subscribe to its shares. It requires minimum 2 and maximum 200 shareholders. A Public Limited Company can invite public to subscribe to its shares and has no restriction on share transfer, requiring minimum 7 shareholders."
    },
    {
      question: "Can I start a company with just one director?",
      answer: "No, a Private Limited Company requires minimum 2 directors. However, you can start a One Person Company (OPC) with just one director, which is a special category under the Companies Act."
    },
    {
      question: "What happens if my company name is rejected?",
      answer: "If your preferred name is rejected, we will suggest alternative names and help you choose a suitable one. We typically suggest 3-4 alternative names during the initial consultation to avoid delays."
    }
  ]

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }
  if(!serviceData){
    return null
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
    

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">{serviceData.categoryTitle||serviceData.name||""}</h1>
          <p className="page-subtitle">Complete business formation and compliance solutions to get your company legally established</p>
        </div>

        {/* Service Overview */}
        <section id="overview" className="service-card">
          <h2 className="service-title">
            🏢 {serviceData.name}
          </h2>
          
          <div className="service-summary">
            <p>{serviceData.description} Our comprehensive company formation service helps you establish your business legally and efficiently. We handle all the paperwork, regulatory compliance, and legal requirements to get your company up and running quickly. From choosing the right business structure to obtaining necessary licenses, we provide end-to-end support for your business formation needs.</p>
          </div>

          {/* Key Features */}
          <div className="section">
            <h3 className="section-title">
              ⭐ Key Features
            </h3>
            <div className="section-content">
              <div className="key-features-grid">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="process-step">
                    <div className="step-number">{feature.number}</div>
                    <div className="step-content">
                      <div className="step-title">{feature.title}</div>
                      <div className="step-description">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section">
          <h3 className="section-title">
            ⚙️ Our Process
          </h3>
          <div className="section-content">
            <div className="process-steps">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{step.number}</div>
                  <div className="step-content">
                    <div className="step-title">{step.title}</div>
                    <div className="step-description">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="section">
          <h3 className="section-title">
            🕐 Service Timeline
          </h3>
          <div className="section-content">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-icon">{item.number}</div>
                <div className="timeline-content">
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-duration">{item.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documents Required */}
        <section id="documents" className="section">
          <h3 className="section-title">
            📄 Documents Required
          </h3>
          <div className="section-content">
            <div className="documents-list">
              {(serviceData.documents??[]).map((doc, index) => (
                <div key={index} className="document-item">
                  <div className="document-icon">📋</div>
                  <strong style={{ display: 'block', marginBottom: '0.2rem', color: '#333', fontSize: '0.95rem' }}>{doc}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibility" className="section">
          <h3 className="section-title">
            ✅ Who Can Apply
          </h3>
          <div className="section-content">
            <ul className="eligibility-list">
              {eligibilityItems.map((item, index) => (
                <li key={index} className="eligibility-item">
                  <span className="check-icon">✓</span>
                  <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing */}
  <section className="mb-8">
  <div className="text-white rounded-xl p-8 text-center relative overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300" style={{ backgroundColor: '#155dfc' }}>
    
    {/* Sparkle animation */}
    <div className="absolute top-0 right-0 animate-pulse text-yellow-300 p-4 text-xl">✨</div>
    
    <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center animate-fadeIn">
      💰 <span className="ml-2">Service Pricing</span>
    </h3>
    
    <div className="mb-4 transition-all duration-500">
      <span className="text-3xl line-through text-blue-200 mr-4">{formatRupees(originalPrice) + suffix}</span>
      <span className="text-5xl font-bold text-white animate-bounce"> {formatRupees(finalPrice) + suffix}</span>
    </div>
    
    <div className="bg-blue-600 text-white px-4 py-2 rounded-full inline-block mb-4 shadow-md animate-pulse">
          Save {formatRupees(discountAmount)} (24% Off)


    </div>
    
    <p className="text-blue-100 mb-6 transition-opacity duration-300 hover:opacity-90">
      Includes all services, government fees, documentation, and professional charges
    </p>
    
    <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fadeIn">
      Select This Service
    </button>
  </div>
</section>


        {/* FAQ */}
        <section id="faq" className="section">
          <h3 className="section-title">
            ❓ Frequently Asked Questions
          </h3>
          <div className="section-content">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.question}</span>
                  <span className={`faq-toggle ${activeAccordion === index ? 'active' : ''}`}>
                    {activeAccordion === index ? '▲' : '▼'}
                  </span>
                </div>
                {activeAccordion === index && (
                  <div className="faq-answer">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}


