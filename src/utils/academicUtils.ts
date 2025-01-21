export const calculateRandomAcademics = () => {
  // Random GPA between 2.0 and 4.0
  const gpa = (Math.random() * 2 + 2).toFixed(2);
  
  // Random completed credits between 0 and 120
  const completedCredits = Math.floor(Math.random() * 121);
  
  return {
    gpa: parseFloat(gpa),
    completedCredits
  };
};

export const getLastUpdateTime = () => {
  const lastUpdate = localStorage.getItem('lastAcademicUpdate');
  return lastUpdate ? parseInt(lastUpdate) : 0;
};

export const shouldUpdateAcademics = () => {
  const lastUpdate = getLastUpdateTime();
  const now = Date.now();
  const twelveHours = 12 * 60 * 60 * 1000;
  return now - lastUpdate >= twelveHours;
}; 