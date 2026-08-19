// RaVida Medical & Holistic Clinic — service catalog data
// Edited via Admin Mode. Structure: categories -> subcategories -> service groups -> sub-items

const DATA = {
  "clinicName": "RaVida",
  "tagline": "MEDICAL AND HOLISTIC CLINIC",
  "theme": {
    "colors": {
      "bg0": "#0a0a0a",
      "bg1": "#141414",
      "bg2": "#1b1b1b",
      "gold": "#c9a85c",
      "goldBright": "#e4c983",
      "white": "#f4f2ec",
      "gray": "#8d8d88",
      "grayDim": "#5f5f5b",
      "cardBorder": "rgba(201, 168, 92, 0.16)",
      "cardBorderHover": "rgba(201, 168, 92, 0.45)"
    },
    "fonts": {
      "displayFont": "'Cormorant Garamond', 'Playfair Display', serif",
      "bodyFont": "'Poppins', 'Inter', sans-serif",
      "homeTitleSize": "28px",
      "screenTitleSize": "34px",
      "bodySize": "16px"
    },
    "logo": {
      "src": "logo.jpeg",
      "size": 180
    },
    "background": {
      "type": "video",
      "value": "https://streamable.com/n2k274"
    },
    "icons": {
      "aesthetic": "smile",
      "physio": "sun",
      "medical": "plus",
      "wellness": "clock"
    }
  },
  "categories": [
    {
      "id": "aesthetic",
      "name": "Aesthetic and Beauty",
      "icon": "smile",
      "subcategories": [
        {
          "id": "injectables",
          "name": "Injectables and Intervention",
          "badge": "TRENDING",
          "items": [
            {
              "title": "Dermal Fillers",
              "subtitle": "Face contouring and volume restoration",
              "bullets": [
                "Lip enhancement",
                "Cheek volume",
                "Jawline contour",
                "Under-eye filling",
                "Chin augmentation",
                "Nasolabial folds"
              ]
            },
            {
              "title": "Anti-Wrinkle Treatment",
              "subtitle": "Neuromodulators for line reduction",
              "bullets": [
                "Forehead lines",
                "Crow's feet",
                "Frown lines",
                "Bunny lines",
                "Masseter reduction",
                "Neck bands"
              ]
            },
            {
              "title": "Skin Boosters",
              "subtitle": "Deep hydration and radiance",
              "bullets": [
                "Full face rejuvenation",
                "Neck and decollete",
                "Hand rejuvenation",
                "Acne scar improvement"
              ]
            },
            {
              "title": "Biostimulators",
              "subtitle": "Collagen induction therapy",
              "bullets": [
                "Face lifting",
                "Body contouring",
                "Cellulite improvement"
              ]
            }
          ]
        },
        {
          "id": "plastic-surgery",
          "name": "Plastic Surgery",
          "badge": "ADVANCED",
          "items": [
            {
              "title": "Facelift Procedures",
              "subtitle": "Surgical facial rejuvenation",
              "bullets": [
                "Full facelift",
                "Mini facelift",
                "Neck lift",
                "Brow lift",
                "Eyelid surgery"
              ]
            },
            {
              "title": "Rhinoplasty",
              "subtitle": "Nose reshaping surgery",
              "bullets": [
                "Primary rhinoplasty",
                "Revision rhinoplasty",
                "Functional rhinoplasty",
                "Non-surgical nose job"
              ]
            },
            {
              "title": "Facial Implants",
              "subtitle": "Structural enhancement",
              "bullets": [
                "Cheek implants",
                "Chin implants",
                "Jaw implants"
              ]
            },
            {
              "title": "Liposuction and Contouring",
              "subtitle": "Body sculpting surgery",
              "bullets": [
                "Traditional liposuction",
                "VASER liposuction",
                "Laser liposuction",
                "High-definition contouring"
              ]
            },
            {
              "title": "Tummy Tuck",
              "subtitle": "Abdominal refinement",
              "bullets": [
                "Full abdominoplasty",
                "Mini tummy tuck",
                "Extended tummy tuck",
                "Lipo-abdominoplasty"
              ]
            },
            {
              "title": "Breast Procedures",
              "subtitle": "Comprehensive breast surgery",
              "bullets": [
                "Breast augmentation",
                "Breast lift",
                "Breast reduction",
                "Implant revision"
              ]
            },
            {
              "title": "Body Lift Surgeries",
              "subtitle": "Comprehensive body contouring",
              "bullets": [
                "Arm lift",
                "Thigh lift",
                "Lower body lift",
                "Brazilian butt lift"
              ]
            }
          ]
        },
        {
          "id": "skin-treatments",
          "name": "Skin Treatments",
          "badge": "POPULAR",
          "items": [
            {
              "title": "HydraFacial",
              "subtitle": "Multi-step medical-grade facial",
              "bullets": [
                "Deep cleansing",
                "Exfoliation",
                "Extraction",
                "Hydration",
                "Antioxidant infusion",
                "LED therapy"
              ]
            },
            {
              "title": "OxyGeneo",
              "subtitle": "3-in-1 super facial treatment",
              "bullets": [
                "Exfoliation",
                "Oxygenation",
                "Nutrient infusion",
                "Skin rejuvenation"
              ]
            },
            {
              "title": "HIFU Treatment",
              "subtitle": "Non-surgical lifting and tightening",
              "bullets": [
                "Full face lift",
                "Neck tightening",
                "Jawline definition",
                "Brow lift",
                "Body contouring"
              ]
            },
            {
              "title": "Chemical Peels",
              "subtitle": "Resurfacing and renewal",
              "bullets": [
                "Light peels",
                "Medium peels",
                "Deep peels",
                "Custom formulations"
              ]
            },
            {
              "title": "Microneedling",
              "subtitle": "Collagen induction therapy",
              "bullets": [
                "Face rejuvenation",
                "Acne scarring",
                "Stretch marks",
                "Hair restoration"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "physio",
      "name": "Physio and Recovery",
      "icon": "sun",
      "subcategories": [
        {
          "id": "recovery-rehab",
          "name": "Recovery and Rehab Sessions",
          "badge": "POPULAR",
          "items": [
            {
              "title": "Manual Therapy",
              "subtitle": "Hands-on treatment techniques",
              "bullets": [
                "Joint mobilization",
                "Soft tissue release",
                "Myofascial release",
                "Muscle energy techniques"
              ]
            },
            {
              "title": "Electro-Therapy",
              "subtitle": "Device-based recovery",
              "bullets": [
                "TENS therapy",
                "Ultrasound therapy",
                "Shockwave therapy",
                "EMS treatment"
              ]
            },
            {
              "title": "Thermal Recovery",
              "subtitle": "Heat and cold therapies",
              "bullets": [
                "Cryotherapy",
                "Thermotherapy",
                "Contrast therapy",
                "Paraffin therapy"
              ]
            }
          ]
        },
        {
          "id": "sports-recovery",
          "name": "Sports Recovery",
          "badge": "TRENDING",
          "items": [
            {
              "title": "Sports Massage",
              "subtitle": "Performance-focused therapy",
              "bullets": [
                "Pre-event massage",
                "Post-event recovery",
                "Maintenance massage",
                "Injury prevention"
              ]
            },
            {
              "title": "Performance Recovery",
              "subtitle": "Athletic optimization",
              "bullets": [
                "Movement analysis",
                "Performance testing",
                "Recovery protocols",
                "Return to sport programs"
              ]
            },
            {
              "title": "Therapeutic Massage",
              "subtitle": "Deep tissue treatment",
              "bullets": [
                "Gun massage therapy",
                "Trigger point release",
                "Deep tissue work",
                "Sports recovery"
              ]
            }
          ]
        },
        {
          "id": "specialized-therapies",
          "name": "Specialized Therapies",
          "items": [
            {
              "title": "Cupping Therapy",
              "subtitle": "Traditional healing technique",
              "bullets": [
                "Dry cupping",
                "Wet cupping",
                "Moving cupping",
                "Facial cupping"
              ]
            },
            {
              "title": "Lymphatic Drainage",
              "subtitle": "Detox and reduction therapy",
              "bullets": [
                "Manual lymphatic drainage",
                "Post-surgical drainage",
                "Compression therapy",
                "Decongestive therapy"
              ]
            },
            {
              "title": "TCM Acupuncture",
              "subtitle": "Traditional Chinese medicine",
              "bullets": [
                "Pain management",
                "Stress relief",
                "Fertility support",
                "Digestive health"
              ]
            },
            {
              "title": "Zero Gravity Massage",
              "subtitle": "Full body relaxation",
              "bullets": [
                "Zero gravity positioning",
                "Full body massage",
                "Heat therapy",
                "Air compression"
              ]
            }
          ]
        },
        {
          "id": "rehab-programs",
          "name": "Rehabilitation Programs",
          "items": [
            {
              "title": "Orthopedic Rehabilitation",
              "subtitle": "Musculoskeletal recovery",
              "bullets": [
                "Post-surgical rehab",
                "Fracture recovery",
                "Joint replacement rehab",
                "Spine rehabilitation"
              ]
            },
            {
              "title": "Neurological Physiotherapy",
              "subtitle": "Nervous system recovery",
              "bullets": [
                "Stroke rehabilitation",
                "Parkinson's therapy",
                "Balance training",
                "Coordination exercises"
              ]
            },
            {
              "title": "Geriatric Physiotherapy",
              "subtitle": "Age-focused care",
              "bullets": [
                "Mobility improvement",
                "Fall prevention",
                "Strength maintenance",
                "Pain management"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "medical",
      "name": "Medical Services",
      "icon": "plus",
      "subcategories": [
        {
          "id": "general-medical",
          "name": "General Medical",
          "badge": "POPULAR",
          "items": [
            {
              "title": "General Consultation",
              "subtitle": "Comprehensive health assessment",
              "bullets": [
                "Full examination",
                "Health screening",
                "Preventive care",
                "Referral services"
              ]
            },
            {
              "title": "Cardiology",
              "subtitle": "Heart health services",
              "bullets": [
                "ECG examination",
                "Heart monitoring",
                "Cardiac screening",
                "Lifestyle counseling"
              ]
            },
            {
              "title": "Gastroenterology",
              "subtitle": "Digestive system care",
              "bullets": [
                "Upper GI endoscopy",
                "Lower GI endoscopy",
                "Digestive consultation",
                "Liver assessment"
              ]
            }
          ]
        },
        {
          "id": "pain-management",
          "name": "Pain Management",
          "badge": "TRENDING",
          "items": [
            {
              "title": "Chronic Pain Treatment",
              "subtitle": "Long-term pain solutions",
              "bullets": [
                "Diagnostic assessment",
                "Medication management",
                "Interventional procedures",
                "Multidisciplinary care"
              ]
            },
            {
              "title": "Interventional Pain",
              "subtitle": "Minimally invasive procedures",
              "bullets": [
                "Joint injections",
                "Nerve blocks",
                "Radiofrequency ablation",
                "Spinal procedures"
              ]
            }
          ]
        },
        {
          "id": "medical-nutrition",
          "name": "Medical Nutrition",
          "items": [
            {
              "title": "Nutritional Assessment",
              "subtitle": "Comprehensive diet evaluation",
              "bullets": [
                "Body composition analysis",
                "Metabolic testing",
                "Dietary consultation",
                "Personalized meal planning"
              ]
            },
            {
              "title": "Weight Management",
              "subtitle": "Medical weight solutions",
              "bullets": [
                "Medical assessment",
                "Prescription programs",
                "Behavioral support",
                "Long-term maintenance"
              ]
            }
          ]
        },
        {
          "id": "plastic-surgery-medical",
          "name": "Plastic Surgery",
          "badge": "ADVANCED",
          "items": [
            {
              "title": "Facelift Procedures",
              "subtitle": "Surgical facial rejuvenation",
              "bullets": [
                "Full facelift",
                "Mini facelift",
                "Neck lift",
                "Brow lift",
                "Eyelid surgery"
              ]
            },
            {
              "title": "Rhinoplasty",
              "subtitle": "Nose reshaping surgery",
              "bullets": [
                "Primary rhinoplasty",
                "Revision rhinoplasty",
                "Functional rhinoplasty",
                "Non-surgical nose job"
              ]
            },
            {
              "title": "Facial Implants",
              "subtitle": "Structural enhancement",
              "bullets": [
                "Cheek implants",
                "Chin implants",
                "Jaw implants"
              ]
            },
            {
              "title": "Liposuction and Contouring",
              "subtitle": "Body sculpting surgery",
              "bullets": [
                "Traditional liposuction",
                "VASER liposuction",
                "Laser liposuction",
                "High-definition contouring"
              ]
            },
            {
              "title": "Tummy Tuck",
              "subtitle": "Abdominal refinement",
              "bullets": [
                "Full abdominoplasty",
                "Mini tummy tuck",
                "Extended tummy tuck",
                "Lipo-abdominoplasty"
              ]
            },
            {
              "title": "Breast Procedures",
              "subtitle": "Comprehensive breast surgery",
              "bullets": [
                "Breast augmentation",
                "Breast lift",
                "Breast reduction",
                "Implant revision"
              ]
            },
            {
              "title": "Body Lift Surgeries",
              "subtitle": "Comprehensive body contouring",
              "bullets": [
                "Arm lift",
                "Thigh lift",
                "Lower body lift",
                "Brazilian butt lift"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "wellness",
      "name": "Wellness and Holistic",
      "icon": "clock",
      "subcategories": [
        {
          "id": "mind-body",
          "name": "Mind and Body",
          "badge": "POPULAR",
          "items": [
            {
              "title": "Yoga Sessions",
              "subtitle": "Guided movement practice",
              "bullets": [
                "Private yoga",
                "Group classes",
                "Therapeutic yoga",
                "Prenatal yoga"
              ]
            },
            {
              "title": "Meditation",
              "subtitle": "Mindfulness training",
              "bullets": [
                "Guided meditation",
                "Breathwork",
                "VR meditation therapy",
                "Sound healing"
              ]
            },
            {
              "title": "VR Meditation Therapy",
              "subtitle": "Immersive relaxation",
              "bullets": [
                "Nature immersion",
                "Guided visualization",
                "Stress reduction",
                "Anxiety management"
              ]
            }
          ]
        },
        {
          "id": "body-analysis",
          "name": "Body Analysis",
          "items": [
            {
              "title": "Wellness Assessment",
              "subtitle": "Comprehensive body analysis",
              "bullets": [
                "Body composition",
                "Metabolic rate",
                "Cellular health",
                "Nutritional status"
              ]
            },
            {
              "title": "Nutrition Programs",
              "subtitle": "Personalized diet plans",
              "bullets": [
                "Initial consultation",
                "Custom meal planning",
                "Follow-up sessions",
                "Supplement guidance"
              ]
            }
          ]
        },
        {
          "id": "iv-therapy",
          "name": "IV Therapy and Drips",
          "badge": "ADVANCED",
          "items": [
            {
              "title": "Wellness IVs",
              "subtitle": "Essential nutrient infusions",
              "bullets": [
                "Hydration IV",
                "Energy and Fatigue IV",
                "Immunity IV",
                "Detox and Liver Support"
              ]
            },
            {
              "title": "Beauty IVs",
              "subtitle": "Aesthetic enhancement drips",
              "bullets": [
                "Beauty Glow IV",
                "Hair and Nail IV",
                "Skin Treatment IV",
                "Anti-Aging IV"
              ]
            },
            {
              "title": "Performance IVs",
              "subtitle": "Athletic optimization",
              "bullets": [
                "Fitness and Recovery IV",
                "Athlete Performance IV",
                "Pre-event preparation",
                "Post-event recovery"
              ]
            },
            {
              "title": "Specialty IVs",
              "subtitle": "Targeted treatments",
              "bullets": [
                "Brain and Focus IV",
                "Weight Management IV",
                "Relaxation and Mood IV",
                "Advanced Longevity IV",
                "Medical IV (Iron, Calcium)",
                "Custom IV Cocktails"
              ]
            }
          ]
        },
        {
          "id": "compression-therapy",
          "name": "Compression Therapy",
          "items": [
            {
              "title": "Air Relax System",
              "subtitle": "Pneumatic compression therapy",
              "bullets": [
                "Leg recovery",
                "Arm recovery",
                "Full body session",
                "Post-workout recovery"
              ]
            }
          ]
        }
      ]
    }
  ]
};
