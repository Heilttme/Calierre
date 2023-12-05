import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import couple from '../../images/couple.jpg'
import calligraphy from '../../images/calligraphy.jpg'
import event from '../../images/event.jpg'
import letter from '../../images/letter.jpg'
import { t } from "i18next";

// const Horizon = () => {
//   return (
//     <div className="bg-neutral-800">
//       <div className="flex h-48 items-center justify-center">
//         <span className="font-semibold uppercase text-neutral-500">
//           Scroll down
//         </span>
//       </div>
//       <HorizontalScrollCarousel />
//       <div className="flex h-48 items-center justify-center">
//         <span className="font-semibold uppercase text-neutral-500">
//           Scroll up
//         </span>
//       </div>
//     </div>
//   );
// };

const HorizontalScrollCarousel = ({ blocks }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["15%", "-50%"]);

  return (
    <section ref={targetRef} className="hor-scrl-car-wrap relative">
      <div className="hor-scrl-car-block">
        <motion.div style={{ x }}className='blocks'>
          <motion.div className='block'>
            <img src={calligraphy}/>
            <p>{t("Writing has always been a very popular means of communication. It was believed that an educated person simply must be able to write beautiful letters. Now, of course, the situation has changed, but you can be impressed by a beautiful and perfectly composed letter nowadays, too!")}</p>
          </motion.div>
          <motion.div className='block'>
            <img src={letter}/>
            <p>{t("Our company provides every person with an opportunity to get their hands on a real, beautifully designed, competent letter that will certainly warm the heart of your beloved ones.")}</p>
          </motion.div>
          <motion.div className='block'>
            <img src={couple}/>
            <p>
              {t("Confess to your crush.")}  
              {t("Congratulate your friend on his birthday through a letter, he will be pleasantly surprised.")}
              {t("A letter can serve as an interesting and unusual gift for holidays such as Valentine’s Day, March 8th.")}
            </p>
          </motion.div>
          <motion.div className='block'>
            <img src={couple}/>
            <p>
              {t("Confess to your crush.")}  
              {t("Congratulate your friend on his birthday through a letter, he will be pleasantly surprised.")}
              {t("A letter can serve as an interesting and unusual gift for holidays such as Valentine’s Day, March 8th.")}
            </p>
          </motion.div>
          <motion.div className='block'>
            <img src={couple}/>
            <p>
              {t("Confess to your crush.")}  
              {t("Congratulate your friend on his birthday through a letter, he will be pleasantly surprised.")}
              {t("A letter can serve as an interesting and unusual gift for holidays such as Valentine’s Day, March 8th.")}
            </p>
          </motion.div>
          <motion.div className='block'>
            <img src={event}/>
            <p>
              {t("In addition to letters, our company is engaged in the production of personalized, creative invitations that will serve as an excellent tone in organizing your event, whether it's a wedding, corporate party or birthday.")}
            </p>  
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


export default HorizontalScrollCarousel;


/*

<motion.div
            className='block'
          >
            <img className='pergament' src={pergament}/>
            <p>{t("Writing has always been a very popular means of communication. It was believed that an educated person simply must be able to write beautiful letters. Now, of course, the situation has changed, but you can be impressed by a beautiful and perfectly composed letter nowadays, too!")}</p>
          </motion.div>
          <motion.div
            className='block'
          >
            <img className='pergament' src={pergament}/>
            <p>{t("Writing has always been a very popular means of communication. It was believed that an educated person simply must be able to write beautiful letters. Now, of course, the situation has changed, but you can be impressed by a beautiful and perfectly composed letter nowadays, too!")}</p>
          </motion.div>
          <motion.div
            className='block'
          >
            <img className='pergament' src={pergament}/>
            <p>{t("Writing has always been a very popular means of communication. It was believed that an educated person simply must be able to write beautiful letters. Now, of course, the situation has changed, but you can be impressed by a beautiful and perfectly composed letter nowadays, too!")}</p>
          </motion.div>
          <motion.div 
            className='block' 
          >
            <img className='envelope' src={envelope}/>
            <p>{t("Our company provides every person with an opportunity to get their hands on a real, beautifully designed, competent letter that will certainly warm the heart of your beloved ones.")}</p>
          </motion.div>
          <motion.div 
            className='block' 
          >
            <img className='feather' src={rose}/>
            <p>
              {t("Confess to your crush.")}  
              <br/>
              <br/>
              {t("Congratulate your friend on his birthday through a letter, he will be pleasantly surprised.")}
              <br/>
              <br/>
              {t("A letter can serve as an interesting and unusual gift for holidays such as Valentine’s Day, March 8th.")}
            </p>
          </motion.div>
          <motion.div 
            className='block' 
          >
            <img className='feather' src={feather}/>
            <p>
              
              {t("In addition to letters, our company is engaged in the production of personalized, creative invitations that will serve as an excellent tone in organizing your event, whether it's a wedding, corporate party or birthday.")}
            </p>  
          </motion.div>

*/