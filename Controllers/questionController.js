const question=require('./../Models/questions');


exports.addQuestions=async(req,res)=>{
    const questions = [
 { questionText: 'Which factors are considered when calculating the carbon footprint?', options: ['Energy consumption', 'Food consumption', 'Both'], correctAnswer: 'Both' },
  { questionText: 'What is super green building design?', options: ['Buildings that provide high energy efficiency', 'Buildings built with zero carbon emissions', 'Buildings that improve human health'], correctAnswer: 'Buildings that provide high energy efficiency' },
  { questionText: 'Which greenhouse gas is one of the main causes of ocean acidification?', options: ['Carbon dioxide', 'Methane', 'Nitrous oxide'], correctAnswer: 'Carbon dioxide' },
  { questionText: 'What is one of the biggest barriers to accelerating the transition to low-carbon energy systems?', options: ['Social acceptance', 'High costs', 'Technological limitations'], correctAnswer: 'High costs' },
  { questionText: 'What is biomimicry?', options: ['Developing sustainable solutions by mimicking natural systems', 'Generating energy through artificial photosynthesis', 'Creating projects to protect biodiversity'], correctAnswer: 'Developing sustainable solutions by mimicking natural systems' },
  { questionText: 'What is the main goal of the zero-waste movement?', options: ['Reduce waste production and use resources efficiently', 'Recycle more', 'Produce more plastic'], correctAnswer: 'Reduce waste production and use resources efficiently' },
  { questionText: 'What does the term “natural capital” used for sustainable development refer to?', options: ['The economic value of natural resources', 'Strategies to protect natural resources', 'Energy sources to replace fossil fuels'], correctAnswer: 'The economic value of natural resources' },
  { questionText: 'What is a carbon credit?', options: ['A right purchased by a company to offset its carbon emissions', 'Support for biodiversity-enhancing projects', 'A program encouraging fossil fuel use'], correctAnswer: 'A right purchased by a company to offset its carbon emissions' },
  { questionText: 'What is the most distinct difference of eco-friendly organic farming compared to traditional farming?', options: ['No use of chemical fertilizers and pesticides', 'Higher productivity', 'Monoculture farming'], correctAnswer: 'No use of chemical fertilizers and pesticides' },
  { questionText: 'Which eco-friendly transportation method consumes the least energy?', options: ['Electric vehicles', 'Gasoline vehicles', 'Hydrogen-powered vehicles'], correctAnswer: 'Electric vehicles' },
  { questionText: 'Which energy source is most efficient for storing and transporting hydrogen?', options: ['Wind energy', 'Nuclear energy', 'Hydroelectric energy'], correctAnswer: 'Hydroelectric energy' },
  { questionText: 'Which natural resource is used in geothermal energy production?', options: ['Underground water and steam', 'Sunlight', 'Wind speed'], correctAnswer: 'Underground water and steam' },
  { questionText: 'What strategies are included in the decarbonization process?', options: ['Reducing fossil fuel use', 'Transitioning to renewable energy sources', 'Both'], correctAnswer: 'Both' },
  { questionText: 'In which areas must the greatest progress be made to achieve net zero emissions?', options: ['Transportation and energy', 'Food and agriculture', 'Biodiversity and forests'], correctAnswer: 'Transportation and energy' },
  { questionText: 'Which country has the highest share of renewable energy use?', options: ['Germany', 'Iceland', 'China'], correctAnswer: 'Iceland' },
  { questionText: 'What is one of the main goals of the decarbonization process?', options: ['Increase air pollution', 'Destroy biodiversity', 'Reduce carbon emissions'], correctAnswer: 'Reduce carbon emissions' },
  { questionText: 'What is the possible impact of protecting biodiversity on the national economy?', options: ['Negatively affects the economy', 'Strengthens agriculture and tourism sectors', 'Increases foreign debt'], correctAnswer: 'Strengthens agriculture and tourism sectors' },
  { questionText: 'What are the negative effects of human activities on the health of saline ecosystems?', options: ['Increasing biodiversity', 'Accumulation of heavy metals and habitat loss', 'Acceleration of ocean currents'], correctAnswer: 'Accumulation of heavy metals and habitat loss' },
  { questionText: 'What is one of the most common strategies for efficient energy use?', options: ['Ensuring high energy consumption', 'Applying energy recovery', 'Increasing biomass use'], correctAnswer: 'Applying energy recovery' },
  { questionText: 'Which strategy could be more effective in combating climate change?', options: ['Increasing fossil fuel use', 'Protecting and expanding forests', 'Using more water resources'], correctAnswer: 'Protecting and expanding forests' },
  { questionText: 'Which gas increases the greenhouse effect in the atmosphere the most?', options: ['Methane', 'Carbon dioxide', 'Nitrous oxide'], correctAnswer: 'Methane' },
  { questionText: 'Which materials are preferred in the construction of greener buildings?', options: ['Steel and concrete', 'Wood and recycled materials', 'Plastic and glass'], correctAnswer: 'Wood and recycled materials' },
  { questionText: 'What is passive house design used for energy efficiency?', options: ['Structures with high energy consumption', 'Structures that minimize heat loss', 'Structures that use only solar energy'], correctAnswer: 'Structures that minimize heat loss' },
  { questionText: 'Which energy source has the greatest potential for sustainable energy?', options: ['Solar energy', 'Hydroelectric energy', 'Wind energy'], correctAnswer: 'Solar energy' },
  { questionText: 'Which agricultural practices are more sustainable in combating global warming?', options: ['Monoculture farming', 'Organic farming', 'Traditional farming practices'], correctAnswer: 'Organic farming' },
  { questionText: 'Which of the following measures could slow sea level rise?', options: ['Reducing greenhouse gases', 'Increasing plastic waste', 'Destroying forests'], correctAnswer: 'Reducing greenhouse gases' },
  { questionText: 'What is one of the biggest benefits of protecting biodiversity?', options: ['Increasing natural disasters', 'Supporting agriculture and medicine production', 'Maintaining ecosystem services sustainably'], correctAnswer: 'Maintaining ecosystem services sustainably' },
  { questionText: 'What does social sustainability aim for?', options: ['Destroying biodiversity', 'Increasing social inequality', 'Providing benefit to people and society'], correctAnswer: 'Providing benefit to people and society' },
  { questionText: 'Which decarbonization strategy creates direct environmental impact?', options: ['Switching to renewable energy sources', 'Purchasing carbon credits', 'Increasing social inequality'], correctAnswer: 'Switching to renewable energy sources' },
  { questionText: 'Which fossil fuel causes the most methane emissions?', options: ['Coal', 'Oil', 'Natural gas'], correctAnswer: 'Natural gas' },
  { questionText: 'Which of the following options reduces carbon footprint the most in transportation?', options: ['Gasoline car', 'Electric car', 'Light rail system'], correctAnswer: 'Electric car' },

  { questionText: 'Which of the following threatens the sustainable use of water resources?', options: ['Decreasing groundwater levels', 'Protection of rainforests', 'Use of solar energy'], correctAnswer: 'Decreasing groundwater levels' },
  { questionText: 'Which agricultural practice accelerates soil erosion the most?', options: ['Monoculture farming', 'Sustainable farming', 'Permaculture'], correctAnswer: 'Monoculture farming' },
  { questionText: 'Which of the following can increase the effects of global warming?', options: ['Reducing carbon emissions', 'Rapid urbanization', 'Protecting water resources'], correctAnswer: 'Rapid urbanization' },
  { questionText: 'Which of the following factors accelerates ocean acidification?', options: ['Carbon dioxide emissions', 'Ozone layer depletion', 'Increase in plastic waste'], correctAnswer: 'Carbon dioxide emissions' },
  { questionText: 'Which of the following is a factor contributing to the loss of biodiversity?', options: ['Supporting biological diversity', 'Heatwaves', 'Creating protected areas'], correctAnswer: 'Heatwaves' },
  { questionText: 'What is the most effective strategy in fighting climate change?', options: ['Accelerating the transition to renewable energy', 'Using more fossil fuels', 'Increasing plastic use'], correctAnswer: 'Accelerating the transition to renewable energy' },
  { questionText: 'Which organic material can help reduce carbon emissions?', options: ['Biomass energy', 'Fossil fuels', 'Plastic waste'], correctAnswer: 'Biomass energy' },
  { questionText: 'Which of the following energy types causes the most water consumption?', options: ['Hydroelectric energy', 'Thermal energy', 'Wind energy'], correctAnswer: 'Hydroelectric energy' },
  { questionText: 'Which of the following is a method to increase carbon absorption?', options: ['Deforestation', 'Reforestation', 'Zero waste practices'], correctAnswer: 'Reforestation' },
  { questionText: 'Which of the following does not contribute to the formation of acid rain?', options: ['Burning fossil fuels', 'Use of chemical fertilizers', 'Using renewable energy'], correctAnswer: 'Using renewable energy' },
  { questionText: 'Which of the following biological substances helps reduce the effects of global warming?', options: ['Carbon dioxide', 'Methane', 'Biodiversity'], correctAnswer: 'Biodiversity' },
  { questionText: 'Which of the following energy sources has the lowest environmental impact?', options: ['Hydroelectric energy', 'Solar energy', 'Coal'], correctAnswer: 'Solar energy' },
  { questionText: 'Which sector is most effective in the decarbonization process?', options: ['Agriculture', 'Transportation', 'Industry'], correctAnswer: 'Transportation' },
  { questionText: 'Which country emits the most greenhouse gases?', options: ['China', 'United States', 'India'], correctAnswer: 'China' },
  { questionText: 'Which of the following is a factor that damages marine ecosystems?', options: ['Controlled fishing', 'Marine pollution', 'Protection of biodiversity'], correctAnswer: 'Marine pollution' },
  { questionText: 'Which of the following technologies can be the most efficient alternative to fossil fuels in energy production?', options: ['Geothermal energy', 'Wind energy', 'Coal'], correctAnswer: 'Wind energy' },
  { questionText: 'Which of the following renewable energy sources requires the most land use?', options: ['Solar energy', 'Geothermal energy', 'Wind energy'], correctAnswer: 'Wind energy' },
  { questionText: 'Which of the following is a more sustainable method of food production?', options: ['Monoculture farming', 'Increasing greenhouse gas emissions', 'Organic farming'], correctAnswer: 'Organic farming' },
  { questionText: 'Which factor can increase the occurrence of forest fires?', options: ['Protecting biodiversity', 'Global warming', 'Reduction in natural disasters'], correctAnswer: 'Global warming' },
  { questionText: 'Which of the following is a strategy to prevent water resource depletion?', options: ['Saving water', 'Polluting water more', 'Increasing water consumption'], correctAnswer: 'Saving water' },
  { questionText: 'Which of the following is an unsustainable practice?', options: ['Using renewable energy', 'Using chemical fertilizers', 'Using electric vehicles'], correctAnswer: 'Using chemical fertilizers' },
  { questionText: 'Which of the following factors increases ocean acidification?', options: ['Plastic waste', 'Burning fossil fuels', 'Using renewable energy'], correctAnswer: 'Burning fossil fuels' },
  { questionText: 'Which of the following is the most efficient energy source for power production?', options: ['Geothermal energy', 'Coal', 'Natural gas'], correctAnswer: 'Geothermal energy' },
  { questionText: 'Which factor can help reduce carbon emissions?', options: ['Fossil fuels', 'Electric vehicles', 'Destroying biodiversity'], correctAnswer: 'Electric vehicles' },
  { questionText: 'Which of the following practices can help conserve water resources?', options: ['Constant water consumption', 'Collecting rainwater', 'Increasing plastic usage'], correctAnswer: 'Collecting rainwater' },
  { questionText: 'Which of the following is an environmentally friendly energy source?', options: ['Natural gas', 'Coal', 'Hydroelectric energy'], correctAnswer: 'Hydroelectric energy' },
  { questionText: 'Which sector has the greatest potential to reduce greenhouse gas emissions?', options: ['Agriculture', 'Transportation', 'Industry'], correctAnswer: 'Transportation' },
  { questionText: 'Which of the following factors helps improve soil fertility?', options: ['Monoculture farming', 'Organic farming', 'Chemical fertilizers'], correctAnswer: 'Organic farming' },
  { questionText: 'Which of the following energy sources causes the least harm to water?', options: ['Hydroelectric energy', 'Wind energy', 'Geothermal energy'], correctAnswer: 'Wind energy' },
  { questionText: 'Which of the following is the most sustainable method for food production?', options: ['Using drinking water', 'Using advanced technology', 'Local farming practices'], correctAnswer: 'Local farming practices' },
  { questionText: 'Which of the following is the most important step to prevent global warming?', options: ['Increasing plastic use', 'Using renewable energy', 'Encouraging fossil fuels'], correctAnswer: 'Using renewable energy' }
  
    ];
    
    try{
        await question.insertMany(questions);
        res.status(200).send('Sorular başarıyla eklendi');

    }catch(err){
         res.status(500).send('Sorular eklenirken bir hata oluştu' +err.message);

    }
    
   }

   exports.getRandomQuestions=async(req,res)=>{
    try{
        const questions = await question.aggregate([{ $sample: { size: 20 } }]);//rastgele 20 soru
        res.json({
            count:questions.length,
            questions:questions
        });

    }catch(err){
        res.status(500).json({error:"Sorular alınırken hata oluştu"});

    }
   }