import emailjs from '@emailjs/browser';

async function sendEmail(mentor, user, meeting) {
  try {
      let subject = 'Book Meeting';
      let body = `Your ${meeting.title} meeting 
        has been scheduled with ${mentor.firstName} ${mentor.lastName}
        on: ${new Date(meeting.startDate).toLocaleString()} - ${new Date(meeting.endDate).toLocaleString()}`;

        const message = {
          to_email: user.email,
          to_user: user.firstName,
          from_email: mentor.email,
          subject,
          body,
        };

        emailjs.send('service_3qby9dc', 'template_pixtpi9', message, 'C6z96zMIXtm4Yev6x')
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
       
  }
    catch (error) {
      throw new Error(error);
    }
}

export default sendEmail;