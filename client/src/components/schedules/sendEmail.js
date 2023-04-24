import emailjs from '@emailjs/browser';
import { fetchMentorByUserId } from '../../MentorsApi'

async function sendEmail (mentorId , user , appointmentData ){
    
    try{
        const mentor = await fetchMentorByUserId(mentorId)
    
        const message = {
            to_email: mentor.user.email,
            to_mentor: mentor.user.firstName,
            from_email: user.email,
            subject: 'Book Meeting',
            body: `Your ${appointmentData.title} Meeeting 
            has been scheduled with ${user.firstName} ${user.lastName}
            on: ${new Date (appointmentData.startDate).toLocaleString()} - ${new Date (appointmentData.endDate).toLocaleString()}`
            
          };
         
            emailjs.send('service_3qby9dc', 'template_pixtpi9', message, 'C6z96zMIXtm4Yev6x')
              .then((result) => {
                  console.log(result.text);
              }, (error) => {
                  console.log(error.text);
              });
    }
    catch(error){
        return error
    }
}

export default sendEmail
