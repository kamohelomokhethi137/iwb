import React from 'react';
import { motion } from 'framer-motion';

function Testimonials() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Trusted by Financial Institutions</h2>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {[
          {
            initials: "NK",
            bg: "bg-cyan-100 dark:bg-cyan-900/30",
            color: "text-cyan-600 dark:text-cyan-400",
            name: "Nkhahle Makara",
            role: "Loan Officer, First National",
            quote: "LotiCredit has reduced our loan approval time by 40% while maintaining excellent risk management. The predictive scoring is incredibly accurate.",
            stars: 5
          },
          {
            initials: "MM",
            bg: "bg-green-100 dark:bg-green-900/30",
            color: "text-green-600 dark:text-green-400",
            name: "Mokopane Makhetha",
            role: "Consumer",
            quote: "I was able to fix errors on my credit report in just 3 days using LotiCredit's dispute system. My score jumped 85 points!",
            stars: 5
          },
          {
            initials: "LM",
            bg: "bg-blue-100 dark:bg-blue-900/30",
            color: "text-blue-600 dark:text-blue-400",
            name: "Liteboho Majoro",
            role: "Risk Manager, City Bank",
            quote: "The portfolio analytics have helped us reduce defaults by 22% this year. The API integration was seamless with our systems.",
            stars: 4
          }
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 ${testimonial.bg} rounded-full flex items-center justify-center mr-4`}>
                <span className={`${testimonial.color} font-bold`}>{testimonial.initials}</span>
              </div>
              <div>
                <h4 className="font-semibold dark:text-white">{testimonial.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
            <div className="mt-4 flex text-amber-400">
              {[...Array(testimonial.stars)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {testimonial.stars < 5 && (
                <>
                  {[...Array(5 - testimonial.stars)].map((_, i) => (
                    <svg key={`empty-${i}`} className="w-5 h-5 fill-current text-gray-300 dark:text-gray-600" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Testimonials;