import React, { useState, useRef, useEffect } from 'react';
import ResumeForm from '../templates/OnCampusResume/ResumeForm';
import PaginatedResume, { PaginatedResumeHandle } from '../templates/OnCampusResume/PaginatedResume';
import type { ResumeData } from '../types';
import { initialResumeData } from '../data/initialData';

// Declare external libraries for TypeScript
declare const jspdf: any;
declare const html2canvas: any;

function ResumeBuilderPage({ onBack }: { onBack: () => void }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [zoomInput, setZoomInput] = useState('100%');
  const paginatedResumeRef = useRef<PaginatedResumeHandle>(null);
  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    setZoomInput(`${Math.round(zoom * 100)}%`);
  }, [zoom]);

  const handleTriggerPhotoUpload = () => {
    photoFileInputRef.current?.click();
  };

  const handleTriggerLogoUpload = () => {
    logoFileInputRef.current?.click();
  };

  const isPlaceholder = (url: string) => url.includes('via.placeholder.com');

  const validateImages = (): string | null => {
    const photoIsPlaceholder = isPlaceholder(resumeData.personalDetails.photo);
    const logoIsPlaceholder = isPlaceholder(resumeData.personalDetails.logo);

    if (photoIsPlaceholder && logoIsPlaceholder) {
      return "Please upload a profile photo and the institute logo before downloading.";
    }
    if (photoIsPlaceholder) {
      return "Please upload a profile photo before downloading.";
    }
    if (logoIsPlaceholder) {
      return "Please upload the institute logo before downloading.";
    }
    return null; // All good
  };

  const showDownloadError = (message: string) => {
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    setDownloadError(message);
    errorTimeoutRef.current = window.setTimeout(() => {
        setDownloadError(null);
        errorTimeoutRef.current = null;
    }, 4000); // 4 seconds
  };


  const handleDownloadPdf = async () => {
    const validationError = validateImages();
    if (validationError) {
      showDownloadError(validationError);
      return;
    }

    const container = paginatedResumeRef.current?.getHtmlForPdf();
    if (!container) {
      console.error("Resume container not found for PDF generation.");
      showDownloadError("Could not generate PDF. Please try again.");
      return;
    }

    const pageElements = container.querySelectorAll('.resume-page-container');
    if (pageElements.length === 0) {
      console.error("No pages found to download.");
      showDownloadError("There is no content to download as a PDF.");
      return;
    }

    const pdf = new jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pageElements.length; i++) {
      const pageElement = pageElements[i] as HTMLElement;
      
      const uploadButtons = pageElement.parentElement?.querySelectorAll('button[aria-label^="Upload"]');
      uploadButtons?.forEach(btn => (btn as HTMLElement).style.visibility = 'hidden');

      const canvas = await html2canvas(pageElement, {
        scale: 2,
        useCORS: true,
        width: pageElement.offsetWidth,
        height: pageElement.offsetHeight,
      });

      uploadButtons?.forEach(btn => (btn as HTMLElement).style.visibility = 'visible');

      if (i > 0) {
        pdf.addPage();
      }
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(`${resumeData.personalDetails.name.replace(/\s/g, '_')}_Resume.pdf`);
  };

  const handleZoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomInput(e.target.value);
  };

  const applyZoom = () => {
    let numericValue = parseFloat(zoomInput.replace(/%/g, '').trim());
    if (!isNaN(numericValue)) {
      numericValue = Math.max(20, Math.min(500, numericValue)); // Clamp between 20% and 500%
      setZoom(numericValue / 100);
    } else {
      // if invalid, revert input to current zoom value
      setZoomInput(`${Math.round(zoom * 100)}%`);
    }
  };

  const handleZoomInputBlur = () => {
    applyZoom();
  };

  const handleZoomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyZoom();
      (e.target as HTMLInputElement).blur(); // remove focus
    } else if (e.key === 'Escape') {
      // revert to original value and blur
      setZoomInput(`${Math.round(zoom * 100)}%`);
      (e.target as HTMLInputElement).blur();
    }
  };


  return (
    <div className="flex h-screen bg-gray-200 overflow-hidden">
      <aside className={`transition-all duration-300 ease-in-out bg-white shadow-lg flex-shrink-0 relative ${isFormVisible ? 'w-full md:w-[500px]' : 'w-0'} overflow-hidden`}>
        <div className="h-screen overflow-y-auto">
          <ResumeForm 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
            photoFileInputRef={photoFileInputRef}
            logoFileInputRef={logoFileInputRef}
          />
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto flex flex-col items-center">
        <div className="mb-6 bg-white p-2 rounded-lg shadow-md flex items-center space-x-2 sticky top-0 z-10">
            <button 
              onClick={onBack}
              className="group flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 mr-2 shadow-md"
              title="Back to Templates"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
               </svg>
               Back
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <button onClick={() => setZoom(prev => Math.max(0.2, prev - 0.1))} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold">-</button>
            <button onClick={() => setZoom(1)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Reset</button>
            <button onClick={() => setZoom(prev => prev + 0.1)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-bold">+</button>
            <input
              type="text"
              value={zoomInput}
              onChange={handleZoomInputChange}
              onBlur={handleZoomInputBlur}
              onKeyDown={handleZoomInputKeyDown}
              className="text-sm text-gray-600 w-16 text-center bg-gray-50 border border-gray-300 rounded py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Zoom percentage"
            />
            <button onClick={handleDownloadPdf} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm flex items-center space-x-1.5 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>PDF</span>
            </button>
        </div>
        
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top' }} className="transition-transform duration-200">
           <PaginatedResume 
            ref={paginatedResumeRef}
            resumeData={resumeData} 
            onPhotoUploadClick={handleTriggerPhotoUpload}
            onLogoUploadClick={handleTriggerLogoUpload}
          />
        </div>
      </main>

      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-30 bg-blue-600 text-white rounded-r-lg px-2 py-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
          aria-label="Show Editor"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {isFormVisible && (
       <button
          onClick={() => setIsFormVisible(false)}
          className="fixed top-1/2 -translate-y-1/2 z-30 bg-blue-600 text-white rounded-l-lg px-2 py-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out left-full md:left-[500px] -translate-x-full"
          aria-label="Hide Editor"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
    )}

    {/* Toast Notification */}
    {downloadError && (
      <div className="fixed bottom-10 left-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
        {downloadError}
      </div>
    )}
    </div>
  );
}

export default ResumeBuilderPage;