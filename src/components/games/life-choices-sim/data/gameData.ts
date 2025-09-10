import { Decision } from '../types/game';

export const gameDecisions: Decision[] = [
  {
    id: 1,
    time: '6:00 AM',
    hour: 6,
    timeOfDay: 'morning',
    title: 'Morning Wake-up',
    description: 'Your alarm goes off. How do you want to start your day?',
    choices: [
      {
        text: 'Quick shower and healthy breakfast',
        description: 'Start the day feeling fresh and energized',
        impact: { health: 15, satisfaction: 10, environment: -5, cost: 10 }
      },
      {
        text: 'Hit snooze and grab coffee on the go',
        description: 'Get some extra sleep but rush through morning',
        impact: { health: -5, satisfaction: 5, environment: -10, cost: 15 }
      },
      {
        text: 'Exercise routine and homemade smoothie',
        description: 'Energizing workout and nutritious breakfast',
        impact: { health: 25, satisfaction: 15, environment: 5, cost: 5 }
      },
      {
        text: 'Sleep in and skip breakfast',
        description: 'More rest but start day unprepared',
        impact: { health: -10, satisfaction: -5, environment: 0, cost: 0 }
      }
    ]
  },
  {
    id: 2,
    time: '7:30 AM',
    hour: 7,
    timeOfDay: 'morning',
    title: 'Commute to Work',
    description: 'Time to head to work. What\'s your transportation choice?',
    choices: [
      {
        text: 'Walk or bike to work',
        description: 'Eco-friendly and good exercise, but takes longer',
        impact: { health: 20, satisfaction: 10, environment: 15, cost: 0 }
      },
      {
        text: 'Take public transportation',
        description: 'Affordable and environmentally conscious option',
        impact: { health: 5, satisfaction: 5, environment: 10, cost: 5 }
      },
      {
        text: 'Drive your car',
        description: 'Quick and convenient but not eco-friendly',
        impact: { health: -5, satisfaction: 10, environment: -15, cost: 20 }
      },
      {
        text: 'Order a rideshare',
        description: 'Convenient but expensive and less sustainable',
        impact: { health: 0, satisfaction: 15, environment: -10, cost: 25 }
      }
    ]
  },
  {
    id: 3,
    time: '10:00 AM',
    hour: 10,
    timeOfDay: 'morning',
    title: 'Mid-Morning Break',
    description: 'You have a short break at work. How do you spend it?',
    choices: [
      {
        text: 'Take a walk outside',
        description: 'Fresh air and movement to recharge',
        impact: { health: 15, satisfaction: 10, environment: 5, cost: 0 }
      },
      {
        text: 'Buy expensive coffee and pastry',
        description: 'Indulge in a treat but costly and unhealthy',
        impact: { health: -10, satisfaction: 15, environment: -5, cost: 15 }
      },
      {
        text: 'Chat with colleagues',
        description: 'Social connection and relationship building',
        impact: { health: 0, satisfaction: 15, environment: 0, cost: 0 }
      },
      {
        text: 'Work through break',
        description: 'Stay productive but miss chance to recharge',
        impact: { health: -5, satisfaction: -10, environment: 0, cost: 0 }
      }
    ]
  },
  {
    id: 4,
    time: '12:30 PM',
    hour: 12,
    timeOfDay: 'afternoon',
    title: 'Lunch Decision',
    description: 'Lunchtime! What sounds good to you?',
    choices: [
      {
        text: 'Homemade lunch from home',
        description: 'Healthy, budget-friendly, and sustainable',
        impact: { health: 20, satisfaction: 10, environment: 10, cost: 0 }
      },
      {
        text: 'Local restaurant with friends',
        description: 'Social experience but more expensive',
        impact: { health: 5, satisfaction: 20, environment: -5, cost: 25 }
      },
      {
        text: 'Fast food delivery',
        description: 'Quick and convenient but unhealthy and costly',
        impact: { health: -15, satisfaction: 10, environment: -15, cost: 20 }
      },
      {
        text: 'Skip lunch to finish work',
        description: 'Save time and money but harm your health',
        impact: { health: -20, satisfaction: -10, environment: 0, cost: 0 }
      }
    ]
  },
  {
    id: 5,
    time: '3:00 PM',
    hour: 15,
    timeOfDay: 'afternoon',
    title: 'Afternoon Energy Dip',
    description: 'You\'re feeling tired. How do you boost your energy?',
    choices: [
      {
        text: 'Take a 10-minute power nap',
        description: 'Natural energy boost without any cost',
        impact: { health: 15, satisfaction: 10, environment: 0, cost: 0 }
      },
      {
        text: 'Drink an energy drink',
        description: 'Quick energy but artificial and unhealthy',
        impact: { health: -10, satisfaction: 5, environment: -5, cost: 8 }
      },
      {
        text: 'Do desk stretches and deep breathing',
        description: 'Healthy way to re-energize and refocus',
        impact: { health: 10, satisfaction: 15, environment: 0, cost: 0 }
      },
      {
        text: 'Push through with willpower',
        description: 'No immediate cost but increases stress',
        impact: { health: -5, satisfaction: -15, environment: 0, cost: 0 }
      }
    ]
  },
  {
    id: 6,
    time: '6:00 PM',
    hour: 18,
    timeOfDay: 'evening',
    title: 'After Work Activity',
    description: 'Work is done! How do you want to spend your evening?',
    choices: [
      {
        text: 'Go to the gym',
        description: 'Invest in your health and fitness',
        impact: { health: 25, satisfaction: 15, environment: 0, cost: 15 }
      },
      {
        text: 'Meet friends for drinks',
        description: 'Social time but potentially unhealthy and expensive',
        impact: { health: -10, satisfaction: 25, environment: -5, cost: 30 }
      },
      {
        text: 'Take a nature walk',
        description: 'Free, healthy, and environmentally friendly',
        impact: { health: 20, satisfaction: 20, environment: 5, cost: 0 }
      },
      {
        text: 'Order takeout and watch TV',
        description: 'Relaxing but not very active or healthy',
        impact: { health: -15, satisfaction: 10, environment: -10, cost: 25 }
      }
    ]
  },
  {
    id: 7,
    time: '8:00 PM',
    hour: 20,
    timeOfDay: 'evening',
    title: 'Dinner Choice',
    description: 'Time for dinner. What\'s on the menu?',
    choices: [
      {
        text: 'Cook a healthy meal at home',
        description: 'Nutritious, budget-friendly, and sustainable',
        impact: { health: 20, satisfaction: 15, environment: 10, cost: 8 }
      },
      {
        text: 'Order expensive sushi delivery',
        description: 'Delicious but pricey and creates packaging waste',
        impact: { health: 10, satisfaction: 20, environment: -15, cost: 40 }
      },
      {
        text: 'Make a simple salad',
        description: 'Quick, healthy, and eco-friendly',
        impact: { health: 15, satisfaction: 5, environment: 15, cost: 5 }
      },
      {
        text: 'Heat up leftover pizza',
        description: 'Convenient but not very nutritious',
        impact: { health: -5, satisfaction: 10, environment: 5, cost: 0 }
      }
    ]
  },
  {
    id: 8,
    time: '9:30 PM',
    hour: 21,
    timeOfDay: 'evening',
    title: 'Evening Entertainment',
    description: 'How do you want to unwind before bed?',
    choices: [
      {
        text: 'Read a book',
        description: 'Relaxing and educational, perfect for winding down',
        impact: { health: 5, satisfaction: 15, environment: 5, cost: 0 }
      },
      {
        text: 'Binge-watch streaming shows',
        description: 'Entertaining but might affect sleep quality',
        impact: { health: -5, satisfaction: 20, environment: -5, cost: 12 }
      },
      {
        text: 'Video call with family',
        description: 'Social connection and relationship maintenance',
        impact: { health: 5, satisfaction: 25, environment: 0, cost: 0 }
      },
      {
        text: 'Online shopping spree',
        description: 'Fun but expensive and potentially wasteful',
        impact: { health: 0, satisfaction: 15, environment: -20, cost: 50 }
      }
    ]
  },
  {
    id: 9,
    time: '10:30 PM',
    hour: 22,
    timeOfDay: 'night',
    title: 'Pre-Sleep Routine',
    description: 'Getting ready for bed. What\'s your routine?',
    choices: [
      {
        text: 'Meditation and herbal tea',
        description: 'Peaceful preparation for quality sleep',
        impact: { health: 15, satisfaction: 20, environment: 0, cost: 3 }
      },
      {
        text: 'Quick skincare and brush teeth',
        description: 'Essential hygiene with minimal fuss',
        impact: { health: 10, satisfaction: 10, environment: -2, cost: 5 }
      },
      {
        text: 'Scroll social media in bed',
        description: 'Entertaining but can disrupt sleep quality',
        impact: { health: -10, satisfaction: 5, environment: 0, cost: 0 }
      },
      {
        text: 'Skip routine and go straight to bed',
        description: 'Quick but not ideal for health or hygiene',
        impact: { health: -5, satisfaction: -5, environment: 0, cost: 0 }
      }
    ]
  },
  {
    id: 10,
    time: '11:00 PM',
    hour: 23,
    timeOfDay: 'night',
    title: 'Bedtime Decision',
    description: 'Time for sleep. How do you ensure a good night\'s rest?',
    choices: [
      {
        text: 'Early bedtime with all devices off',
        description: 'Prioritize sleep quality and duration',
        impact: { health: 20, satisfaction: 15, environment: 2, cost: 0 }
      },
      {
        text: 'Read for 30 minutes then sleep',
        description: 'Relaxing activity before quality rest',
        impact: { health: 15, satisfaction: 20, environment: 0, cost: 0 }
      },
      {
        text: 'Stay up late watching movies',
        description: 'Fun but will affect tomorrow\'s energy',
        impact: { health: -15, satisfaction: 10, environment: -5, cost: 0 }
      },
      {
        text: 'Work on side projects until late',
        description: 'Productive but sacrifices sleep and health',
        impact: { health: -20, satisfaction: 5, environment: 0, cost: 0 }
      }
    ]
  }
];