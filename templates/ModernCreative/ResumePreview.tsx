import React, { forwardRef } from 'react';
import type { ResumeData } from '../../types';

interface ResumePreviewProps {
  resumeData: ResumeData;
  themeColor: string;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ resumeData, themeColor }, ref) => {
  const { personalDetails, education, internships, achievements, projects, skills, positions, activities, summary, languages } = resumeData;

  const renderHTML = (text: string) => {
      if (!text) return '';
      let processedText = text.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');
      return processedText.replace(/\n/g, '<br />');
  }

  // Styles derived from themeColor
  const sidebarStyle = { backgroundColor: themeColor };
  const textThemeStyle = { color: themeColor };
  const borderThemeStyle = { borderColor: themeColor };
  const tagStyle = { backgroundColor: 'rgba(255, 255, 255, 0.1)' }; // Semi-transparent white
  const dividerStyle = { borderColor: 'rgba(255, 255, 255, 0.2)' }; // Semi-transparent white

  return (
    <div ref={ref} className="flex w-full min-h-[297mm] text-black" style={{ fontFamily: 'Lato, sans-serif' }}>
      
      {/* Sidebar - Left Column */}
      <div className="w-[35%] text-white p-6 flex flex-col min-h-full flex-shrink-0 print:bg-red-500" style={sidebarStyle}>
          
          {/* Photo */}
          {personalDetails.photo && (
              <div className="mb-8 flex justify-center">
                  <img src={personalDetails.photo} alt="Profile" className="h-40 w-40 object-cover rounded-full border-4 shadow-xl" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
              </div>
          )}

          {/* Contact Info */}
          <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 border-b pb-2 mb-3" style={dividerStyle}>Contact</h3>
              <div className="space-y-3 text-sm text-white/90">
                  {personalDetails.email && (
                      <div className="flex items-center break-all">
                          <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          <span>{personalDetails.email}</span>
                      </div>
                  )}
                  {personalDetails.contact && (
                      <div className="flex items-center">
                          <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                          <span>{personalDetails.contact}</span>
                      </div>
                  )}
                  {personalDetails.dob && (
                       <div className="flex items-center">
                          <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          <span>{personalDetails.dob}</span>
                       </div>
                  )}
                  {personalDetails.linkedin && (
                      <div className="flex items-center">
                         <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                             <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                         </svg>
                         <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                      </div>
                  )}
                   {personalDetails.github && (
                      <div className="flex items-center">
                         <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                             <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                         </svg>
                         <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                      </div>
                  )}
              </div>
          </div>

          {/* Education - Sidebar Style */}
          {education && education.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 border-b pb-2 mb-3" style={dividerStyle}>Education</h3>
                <div className="space-y-4">
                    {education.map((edu, idx) => (
                        <div key={idx}>
                            <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                            <p className="text-white/80 text-xs mb-1">{edu.institution}</p>
                            <div className="flex justify-between text-white/60 text-xs">
                                <span>{edu.year}</span>
                                {edu.grade && <span>{edu.grade}</span>}
                            </div>
                        </div>
                    ))}
                </div>
              </div>
          )}

           {/* Skills - Tags */}
           {skills && skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 border-b pb-2 mb-3" style={dividerStyle}>Skills</h3>
                <div className="flex flex-wrap gap-2">
                     {skills.map((skillGroup, idx) => (
                         skillGroup.skills.split(',').map((skill, sIdx) => (
                             skill.trim() && (
                                <span key={`${idx}-${sIdx}`} className="px-2 py-1 text-white/90 text-xs rounded-md" style={tagStyle}>
                                    {skill.trim()}
                                </span>
                             )
                         ))
                     ))}
                </div>
              </div>
          )}

          {/* Languages */}
           {languages && languages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 border-b pb-2 mb-3" style={dividerStyle}>Languages</h3>
                <div className="space-y-2">
                    {languages.map((lang, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <span className="text-white/90">{lang.language}</span>
                            <span className="text-white/60 text-xs">{lang.proficiency}</span>
                        </div>
                    ))}
                </div>
              </div>
          )}
      </div>

      {/* Main Content - Right Column */}
      <div className="w-[65%] p-6 pt-10 flex flex-col bg-white">
          {/* Header */}
          <div className="mb-6">
              <h1 className="text-4xl font-black tracking-tight uppercase mb-2" style={textThemeStyle}>{personalDetails.name}</h1>
              <p className="text-xl text-slate-800 font-medium">{personalDetails.degree}</p>
          </div>

          {/* Professional Summary */}
          {summary && (
              <div className="mb-5">
                   <h2 className="text-lg font-bold uppercase text-slate-800 mb-3 border-l-4 pl-3" style={borderThemeStyle}>Professional Summary</h2>
                   <p className="text-sm text-slate-600 leading-relaxed">
                       {summary}
                   </p>
              </div>
          )}

          {/* Internships */}
          {internships && internships.length > 0 && (
              <div className="mb-5">
                   <h2 className="text-lg font-bold uppercase text-slate-800 mb-3 border-l-4 pl-3" style={borderThemeStyle}>Experience</h2>
                   <div className="space-y-5">
                       {internships.map((intern, idx) => (
                           <div key={idx}>
                               <div className="flex justify-between items-baseline mb-1">
                                   <h3 className="text-base font-bold" style={textThemeStyle}>{intern.title}</h3>
                                   <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">{intern.date}</span>
                               </div>
                               <div className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderHTML(intern.description) }}></div>
                           </div>
                       ))}
                   </div>
              </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
              <div className="mb-5">
                   <h2 className="text-lg font-bold uppercase text-slate-800 mb-3 border-l-4 pl-3" style={borderThemeStyle}>Projects</h2>
                   <div className="space-y-5">
                       {projects.map((proj, idx) => (
                           <div key={idx}>
                               <div className="flex justify-between items-baseline mb-1">
                                   <h3 className="text-base font-bold" style={textThemeStyle}>{proj.name}</h3>
                                   <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">{proj.date}</span>
                               </div>
                               <div className="text-sm text-slate-600 leading-relaxed">
                                   {proj.description.includes('\n') ? (
                                        <ul className="list-disc pl-4 space-y-1">
                                            {proj.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                                <li key={i} dangerouslySetInnerHTML={{ __html: line.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>') }}></li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: renderHTML(proj.description) }}></div>
                                    )}
                               </div>
                           </div>
                       ))}
                   </div>
              </div>
          )}

           {/* Achievements */}
           {achievements && achievements.length > 0 && (
              <div className="mb-5">
                   <h2 className="text-lg font-bold uppercase text-slate-800 mb-3 border-l-4 pl-3" style={borderThemeStyle}>Achievements</h2>
                   <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                      {achievements.map((ach, idx) => (
                          <li key={idx} dangerouslySetInnerHTML={{ __html: ach.description }}></li>
                      ))}
                   </ul>
              </div>
          )}

           {/* Activities */}
           {activities && activities.some(act => act.description.trim() !== '') && (
               <div className="mb-5">
                    <h2 className="text-lg font-bold uppercase text-slate-800 mb-3 border-l-4 pl-3" style={borderThemeStyle}>Activities</h2>
                    <div className="space-y-3">
                        {activities.map((act, idx) => (
                            act.description.trim() !== '' && (
                                <div key={idx}>
                                    <h3 className="text-sm font-bold text-slate-700 mb-1">{act.title}</h3>
                                    <div className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: renderHTML(act.description) }}></div>
                                </div>
                            )
                        ))}
                    </div>
               </div>
           )}

      </div>
    </div>
  );
});

export default ResumePreview;