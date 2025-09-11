import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Droplets, 
  Sun, 
  Factory, 
  TreePine, 
  Home,
  X,
  ArrowRight,
  BookOpen,
  Wind,
  Waves,
  Recycle
} from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  theory: {
    title: string;
    content: string[];
  };
  quizCategory: string;
}

const topics: Topic[] = [
  {
    id: 'climate',
    title: 'Climate Change',
    description: 'Understanding global warming and its effects on our planet',
    icon: Globe,
    color: 'blue',
    theory: {
      title: 'Understanding Climate Change',
      content: [
        'Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, scientific evidence shows that human activities have been the main driver of climate change since the 1800s, primarily through burning fossil fuels like coal, oil, and gas.',
        'The greenhouse effect is essential for life on Earth, but human activities have intensified this natural process. When we burn fossil fuels, we release greenhouse gases like carbon dioxide into the atmosphere. These gases trap heat from the sun, causing global temperatures to rise. This leads to melting ice caps, rising sea levels, extreme weather events, and disruptions to ecosystems worldwide.',
        'The impacts of climate change are already visible: more frequent heatwaves, stronger hurricanes, prolonged droughts, and shifting precipitation patterns. To address this challenge, we need both mitigation (reducing greenhouse gas emissions) and adaptation (adjusting to climate impacts). Individual actions like using renewable energy, improving energy efficiency, and supporting sustainable practices can make a significant difference when adopted collectively.'
      ]
    },
    quizCategory: 'climate'
  },
  {
    id: 'water',
    title: 'Water Conservation',
    description: 'Protecting our most precious resource through smart usage',
    icon: Droplets,
    color: 'cyan',
    theory: {
      title: 'The Importance of Water Conservation',
      content: [
        'Water is essential for all life on Earth, yet only 2.5% of the planet\'s water is fresh water, and less than 1% is easily accessible for human use. The water cycle continuously moves water through evaporation, condensation, and precipitation, but human activities and climate change are disrupting this natural balance in many regions.',
        'Water scarcity affects over 2 billion people worldwide and is expected to worsen due to population growth, urbanization, and climate change. Pollution from industrial activities, agriculture, and urban runoff contaminates water sources, making them unsafe for drinking and harmful to aquatic ecosystems. Overuse of groundwater for irrigation and municipal supplies is depleting aquifers faster than they can be recharged.',
        'Conservation strategies include improving water efficiency in homes and industries, protecting watersheds and wetlands, treating wastewater for reuse, and adopting water-smart agricultural practices. Simple actions like fixing leaks, using water-efficient appliances, collecting rainwater, and being mindful of daily water use can significantly reduce consumption. Protecting water quality through proper waste disposal and supporting policies that safeguard water resources are equally important for ensuring clean water for future generations.'
      ]
    },
    quizCategory: 'water'
  },
  {
    id: 'energy',
    title: 'Renewable Energy',
    description: 'Harnessing clean energy from sun, wind, and water',
    icon: Sun,
    color: 'yellow',
    theory: {
      title: 'The Power of Renewable Energy',
      content: [
        'Renewable energy comes from natural sources that are constantly replenished, including solar, wind, hydroelectric, geothermal, and biomass. Unlike fossil fuels, renewable energy sources produce little to no greenhouse gas emissions during operation, making them crucial for combating climate change. Solar panels convert sunlight directly into electricity, while wind turbines harness kinetic energy from moving air.',
        'The renewable energy sector has experienced remarkable growth, with costs dropping dramatically over the past decade. Solar and wind power are now the cheapest sources of electricity in many parts of the world. Hydroelectric power has been a reliable renewable source for over a century, while newer technologies like geothermal and advanced biomass are expanding the renewable portfolio. Energy storage technologies, particularly batteries, are solving the intermittency challenge of solar and wind power.',
        'Transitioning to renewable energy offers multiple benefits: reduced air pollution, energy independence, job creation in green industries, and long-term cost savings. Countries and communities investing in renewable infrastructure are building resilient energy systems that can withstand fuel price volatility and supply disruptions. Individual actions like installing solar panels, choosing renewable energy providers, and supporting clean energy policies accelerate this vital transition to a sustainable energy future.'
      ]
    },
    quizCategory: 'energy'
  },
  {
    id: 'pollution',
    title: 'Pollution Control',
    description: 'Reducing harmful substances in air, water, and soil',
    icon: Factory,
    color: 'red',
    theory: {
      title: 'Understanding and Controlling Pollution',
      content: [
        'Pollution occurs when harmful substances are introduced into the environment, disrupting natural processes and threatening human health and ecosystem stability. Major types include air pollution from vehicle emissions and industrial activities, water pollution from chemical runoff and sewage, soil contamination from pesticides and industrial waste, and noise pollution from urban activities. Each type of pollution has specific sources, impacts, and control strategies.',
        'Air pollution causes respiratory diseases, cardiovascular problems, and contributes to climate change through greenhouse gas emissions. Water pollution affects drinking water quality, aquatic life, and food chains, while soil contamination reduces agricultural productivity and can contaminate groundwater. Plastic pollution has become a global crisis, with microplastics found in oceans, food chains, and even human bodies.',
        'Effective pollution control requires a combination of regulatory measures, technological solutions, and behavioral changes. Governments implement emission standards, waste treatment requirements, and environmental monitoring programs. Technologies like catalytic converters, wastewater treatment plants, and renewable energy systems reduce pollution at the source. Individual actions such as using public transportation, properly disposing of hazardous materials, choosing eco-friendly products, and supporting clean technologies contribute to pollution reduction efforts.'
      ]
    },
    quizCategory: 'general'
  },
  {
    id: 'wildlife',
    title: 'Wildlife Protection',
    description: 'Conserving biodiversity and protecting endangered species',
    icon: TreePine,
    color: 'green',
    theory: {
      title: 'Protecting Earth\'s Biodiversity',
      content: [
        'Biodiversity encompasses the variety of life on Earth, including genetic diversity within species, species diversity within ecosystems, and ecosystem diversity across landscapes. This biological richness provides essential services like pollination, water purification, climate regulation, and soil formation. However, human activities have accelerated species extinction rates to 100-1,000 times the natural background rate, creating what scientists call the sixth mass extinction.',
        'Habitat destruction is the primary threat to wildlife, driven by deforestation, urbanization, agriculture expansion, and infrastructure development. Other major threats include climate change, pollution, invasive species, overexploitation through hunting and fishing, and disease. These factors often work together, creating cumulative pressures that push species toward extinction and disrupt ecosystem functioning.',
        'Conservation strategies include establishing protected areas, restoring degraded habitats, implementing species recovery programs, and creating wildlife corridors that connect fragmented habitats. International agreements like CITES regulate trade in endangered species, while local conservation efforts engage communities in protecting their natural heritage. Individual actions such as supporting sustainable products, creating wildlife-friendly gardens, participating in citizen science projects, and advocating for conservation policies help protect biodiversity for future generations.'
      ]
    },
    quizCategory: 'biodiversity'
  },
  {
    id: 'sustainable',
    title: 'Sustainable Living',
    description: 'Adopting eco-friendly practices in daily life',
    icon: Home,
    color: 'emerald',
    theory: {
      title: 'Embracing Sustainable Lifestyle Choices',
      content: [
        'Sustainable living involves making choices that reduce our environmental impact while maintaining quality of life. This approach considers the long-term effects of our consumption patterns, energy use, transportation choices, and waste generation. The goal is to live within Earth\'s ecological limits while ensuring resources remain available for future generations. Sustainable practices often save money, improve health, and create more resilient communities.',
        'Key areas of sustainable living include energy efficiency through better insulation, LED lighting, and smart appliances; sustainable transportation via walking, cycling, public transit, and electric vehicles; responsible consumption by buying local, organic, and durable products; waste reduction through the 5 R\'s (Refuse, Reduce, Reuse, Recycle, Rot); and water conservation through efficient fixtures and mindful usage habits.',
        'The transition to sustainable living can start with small changes that gradually become habits. Simple actions like meal planning to reduce food waste, choosing reusable items over disposables, supporting businesses with strong environmental practices, and learning new skills like gardening or repair work can significantly reduce environmental impact. Community involvement through local environmental groups, sharing resources with neighbors, and advocating for sustainable policies amplifies individual efforts and creates positive social change.'
      ]
    },
    quizCategory: 'general'
  },
  {
    id: 'air-pollution',
    title: 'Air Pollution & Solutions',
    description: 'Tackling air quality issues and breathing cleaner air',
    icon: Wind,
    color: 'gray',
    theory: {
      title: 'Combating Air Pollution for Healthier Communities',
      content: [
        'Air pollution consists of harmful substances released into the atmosphere, including particulate matter, nitrogen oxides, sulfur dioxide, carbon monoxide, and volatile organic compounds. These pollutants come from various sources: vehicle emissions, industrial processes, power plants, agricultural activities, and natural events like wildfires. Poor air quality affects billions of people worldwide, causing respiratory diseases, cardiovascular problems, and premature deaths.',
        'The health impacts of air pollution are severe and far-reaching. Fine particulate matter (PM2.5) can penetrate deep into lungs and enter the bloodstream, causing asthma, lung cancer, heart disease, and stroke. Children and elderly people are particularly vulnerable. Air pollution also damages ecosystems, reduces crop yields, and contributes to acid rain that harms forests and aquatic environments.',
        'Solutions to air pollution require coordinated efforts at multiple levels. Governments can implement stricter emission standards, promote clean transportation, and invest in renewable energy. Cities can create low-emission zones, improve public transit, and increase green spaces. Individuals can reduce their contribution by using public transportation, choosing electric or hybrid vehicles, supporting clean energy, and advocating for stronger environmental policies. Technology innovations like electric vehicles, cleaner industrial processes, and air purification systems are making significant progress in reducing air pollution.'
      ]
    },
    quizCategory: 'general'
  },
  {
    id: 'ocean',
    title: 'Ocean Conservation',
    description: 'Protecting marine ecosystems and reducing ocean pollution',
    icon: Waves,
    color: 'blue',
    theory: {
      title: 'Safeguarding Our Ocean Ecosystems',
      content: [
        'Oceans cover 71% of Earth\'s surface and contain 97% of the planet\'s water, making them crucial for climate regulation, weather patterns, and supporting marine life. Ocean ecosystems provide essential services including oxygen production (50% of Earth\'s oxygen comes from marine phytoplankton), carbon sequestration, food security for billions of people, and economic benefits through fishing, tourism, and transportation. However, human activities are severely threatening ocean health.',
        'Major threats to ocean ecosystems include plastic pollution, chemical contamination, overfishing, habitat destruction, and ocean acidification caused by increased CO2 absorption. Plastic waste, particularly single-use items, creates massive garbage patches and microplastics that enter the food chain. Overfishing has depleted many fish populations, while coastal development destroys critical habitats like coral reefs, mangroves, and seagrass beds. Climate change is warming and acidifying oceans, causing coral bleaching and disrupting marine food webs.',
        'Ocean conservation requires global cooperation and immediate action. Solutions include reducing plastic use, supporting sustainable fishing practices, creating marine protected areas, and addressing climate change. Individuals can help by reducing plastic consumption, choosing sustainable seafood, participating in beach cleanups, and supporting organizations working to protect marine environments. International agreements like the Paris Climate Accord and efforts to create a global plastic pollution treaty are essential for coordinated ocean protection efforts.'
      ]
    },
    quizCategory: 'general'
  },
  {
    id: 'waste',
    title: 'Waste Management & Recycling',
    description: 'Reducing waste and creating circular economy solutions',
    icon: Recycle,
    color: 'green',
    theory: {
      title: 'Building a Circular Economy Through Waste Management',
      content: [
        'Waste management involves the collection, treatment, and disposal of waste materials generated by human activities. Traditional linear economy models follow a "take-make-dispose" pattern that leads to resource depletion and environmental degradation. In contrast, circular economy principles aim to eliminate waste through better design, reuse, recycling, and regeneration. Effective waste management reduces environmental pollution, conserves natural resources, and creates economic opportunities.',
        'The waste hierarchy prioritizes waste management strategies: prevention (reducing waste generation), reuse (finding new purposes for items), recycling (processing materials into new products), recovery (extracting energy from waste), and disposal (safe elimination as a last resort). Recycling alone can significantly reduce environmental impact - recycling one ton of paper saves 17 trees, 7,000 gallons of water, and enough energy to power an average home for six months.',
        'Successful waste management requires participation from individuals, businesses, and governments. Communities can implement comprehensive recycling programs, composting initiatives, and waste reduction education. Businesses can adopt sustainable packaging, design products for durability and repairability, and implement take-back programs. Individuals can practice the 5 R\'s (Refuse, Reduce, Reuse, Recycle, Rot), support companies with sustainable practices, and advocate for better waste management policies. Innovation in biodegradable materials, chemical recycling, and waste-to-energy technologies continues to improve our ability to manage waste sustainably.'
      ]
    },
    quizCategory: 'general'
  }
];

const EnvironmentalHub = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const navigate = useNavigate();

  const handleCardClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  const handleTakeQuiz = () => {
    if (selectedTopic) {
      navigate(`/quiz/${selectedTopic.quizCategory}`);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Environmental Learning Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore key environmental topics and deepen your understanding of our planet's challenges and solutions.
          </p>
        </motion.div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleCardClick(topic)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
            >
              <div className={`h-32 bg-gradient-to-br from-${topic.color}-400 to-${topic.color}-600 flex items-center justify-center relative`}>
                <topic.icon className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {topic.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>Learn More</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 text-${topic.color}-500 group-hover:translate-x-1 transition-transform duration-300`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Popup */}
        <AnimatePresence>
          {selectedTopic && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className={`bg-gradient-to-r from-${selectedTopic.color}-400 to-${selectedTopic.color}-600 p-6 text-white relative`}>
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <selectedTopic.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedTopic.title}</h2>
                      <p className="text-lg opacity-90">{selectedTopic.description}</p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-96">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {selectedTopic.theory.title}
                  </h3>
                  
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {selectedTopic.theory.content.map((paragraph, index) => (
                      <p key={index} className="text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                    >
                      Close
                    </button>
                    <motion.button
                      onClick={handleTakeQuiz}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-gradient-to-r from-${selectedTopic.color}-500 to-${selectedTopic.color}-600 hover:from-${selectedTopic.color}-600 hover:to-${selectedTopic.color}-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg flex items-center space-x-2`}
                    >
                      <span>Take Quiz</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnvironmentalHub;