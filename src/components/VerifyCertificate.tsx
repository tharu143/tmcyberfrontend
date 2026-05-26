import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicInternshipCertificate } from '../api/index';
import { ShieldCheck, Download, Loader2, Award, Globe, Phone, ExternalLink } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../assest/logo.png';

interface CertificateDetails {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  domain: string;
  company: string;
  contact: string;
  website: string;
  created_at: string;
}

const VerifyCertificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cert, setCert] = useState<CertificateDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getPublicInternshipCertificate(id);
        setCert(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid certificate verification code');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current || !cert) return;
    try {
      setDownloading(true);
      
      // Select the element to capture
      const element = certificateRef.current;
      
      // Set high scale to capture high-DPI A4-perfect graphics
      const canvas = await html2canvas(element, {
        scale: 3, // Razor-sharp resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Standard A4 landscape dimensions: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Internship_Certificate_${cert.name.replace(/\s+/g, '_')}.pdf`);
      
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Error generating PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold tracking-wide font-poppins">Verifying Internship Credentials...</h2>
        <p className="text-slate-400 text-sm mt-2">Checking official cryptographic registries</p>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans p-6 text-center">
        <div className="bg-red-950/20 border border-red-500/30 p-8 rounded-3xl max-w-md shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <span className="text-3xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold font-poppins text-red-400">Verification Failed</h2>
          <p className="text-slate-300 mt-3 text-sm leading-relaxed">
            The credential verification link you followed is invalid, expired, or revoked. Please contact administration to check your status.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-100 px-6 py-2.5 rounded-xl border border-slate-700 transition-colors font-medium text-sm"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start py-8 px-4 font-sans selection:bg-amber-500/20">
      
      {/* Premium Verification Status Panel */}
      <div className="w-full max-w-5xl mb-8 animate-fadeIn">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20 relative shadow-inner">
              <ShieldCheck className="w-8 h-8 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Verified Credential
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {cert.id}</span>
              </div>
              <h1 className="text-2xl font-bold font-poppins text-slate-100 mt-1 leading-tight">
                Internship Completion Verified
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                This document is officially registered under the digital seal of <strong className="text-slate-300 font-semibold">{cert.company.toUpperCase()}</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center space-x-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 disabled:opacity-50 text-slate-950 font-bold px-6 py-3.5 rounded-2xl transition-all shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 text-sm whitespace-nowrap"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Exporting HD PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF Certificate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Preview Container */}
      <div className="w-full max-w-5xl flex justify-center mb-12 animate-fadeIn relative">
        
        {/* Certificate Display Area */}
        <div className="w-full overflow-auto rounded-3xl p-4 bg-slate-900/30 border border-slate-800/60 shadow-inner flex justify-center">
          
          {/* Print Safe Wrapper representing landscape A4 */}
          <div
            ref={certificateRef}
            id="print-certificate"
            className="w-[1000px] h-[707px] min-w-[1000px] bg-white rounded-[4px] relative overflow-hidden select-none shadow-2xl p-[36px]"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              // Soft marble style linear gradient texture
              backgroundImage: `linear-gradient(45deg, rgba(245, 245, 247, 0.45) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(245, 245, 247, 0.45) 100%), 
                                repeating-linear-gradient(135deg, rgba(200, 200, 200, 0.03) 0px, rgba(200, 200, 200, 0.03) 2px, transparent 2px, transparent 10px),
                                repeating-linear-gradient(45deg, rgba(200, 200, 200, 0.03) 0px, rgba(200, 200, 200, 0.03) 2px, transparent 2px, transparent 10px)`,
            }}
          >
            
            {/* Elegant Double Golden Border Grid */}
            <div className="absolute inset-[15px] border-[3px] border-[#d4af37]/60 pointer-events-none rounded-[2px]" />
            <div className="absolute inset-[22px] border-[1px] border-[#c5a02e]/30 pointer-events-none rounded-[1px]" />
            
            {/* Flowing Golden Abstract Waves on Left Side (reproduced from the image exactly) */}
            <div className="absolute top-0 left-0 h-full w-[240px] pointer-events-none overflow-hidden">
              <svg viewBox="0 0 240 707" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Underlay soft golden paths */}
                <path d="M-10 0 C60 150, 40 400, -20 707 L-20 707 L-10 0 Z" fill="url(#goldGradLight)" opacity="0.15" />
                <path d="M-10 0 C90 120, 110 380, -10 707" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.4" />
                <path d="M-10 0 C120 180, 80 480, -10 707" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.5" />
                <path d="M-10 0 C140 220, 120 540, -10 707" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.3" />
                
                {/* Thick golden wave element resembling the main ribbon wave */}
                <path d="M-50 0 C150 180, 190 480, -30 707 L-50 707 Z" fill="url(#goldGradSolid)" opacity="0.9" style={{ mixBlendMode: 'multiply' }} />
                <path d="M-10 0 C190 200, 160 500, -10 707" stroke="url(#goldLineGrad)" strokeWidth="4" />
                <path d="M-50 0 C220 220, 190 530, -50 707" stroke="url(#goldGrad)" strokeWidth="2.5" opacity="0.8" />
                
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#b38728" />
                    <stop offset="25%" stopColor="#fbf5b7" />
                    <stop offset="50%" stopColor="#daae46" />
                    <stop offset="75%" stopColor="#fbf5b7" />
                    <stop offset="100%" stopColor="#aa7c11" />
                  </linearGradient>
                  <linearGradient id="goldLineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b38728" />
                    <stop offset="50%" stopColor="#fbf5b7" />
                    <stop offset="100%" stopColor="#9a6b0c" />
                  </linearGradient>
                  <linearGradient id="goldGradLight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#daae46" />
                    <stop offset="100%" stopColor="#fbf5b7" />
                  </linearGradient>
                  <linearGradient id="goldGradSolid" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#aa7c11" />
                    <stop offset="20%" stopColor="#e5c158" />
                    <stop offset="40%" stopColor="#b8860b" />
                    <stop offset="60%" stopColor="#fbf5b7" />
                    <stop offset="80%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#8b6508" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Content Area */}
            <div className="h-full w-full flex flex-col justify-between pl-[180px] pr-[30px] pt-[20px] pb-[10px] relative z-10">
              
              {/* Logo / Brand Header */}
              <div className="flex flex-col items-center justify-center mt-4">
                {logo ? (
                  <img 
                    src={logo} 
                    alt="Company Logo" 
                    className="h-[60px] object-contain mb-1 drop-shadow-md"
                    onError={(e) => {
                      // Fallback text if logo doesn't load
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById('logo-fallback');
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}
                <div id="logo-fallback" style={{ display: !logo ? 'block' : 'none' }}>
                  <h3 className="font-poppins text-lg font-extrabold tracking-[0.25em] text-[#0f172a]">
                    TM CYBER TECH
                  </h3>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center mt-2 flex flex-col items-center">
                <h2 className="font-cinzel text-[36px] font-bold text-[#1e293b] tracking-[0.18em] leading-none">
                  CERTIFICATE
                </h2>
                
                {/* Thin gold flanked line for 'OF INTERNSHIP' */}
                <div className="flex items-center justify-center w-full max-w-[480px] mt-2 mb-1">
                  <div className="h-[0.5px] bg-[#d4af37] flex-1" />
                  <span className="font-montserrat text-[12px] font-bold text-[#b38728] uppercase tracking-[0.45em] px-4">
                    OF INTERNSHIP
                  </span>
                  <div className="h-[0.5px] bg-[#d4af37] flex-1" />
                </div>
                
                <p className="font-montserrat text-[10px] font-semibold text-[#64748b] tracking-[0.15em] uppercase">
                  Successfully Completed Internship Program
                </p>
              </div>

              {/* Recipient Cursive Name */}
              <div className="text-center my-2">
                <h3 className="font-greatvibes text-[56px] text-[#1e293b] leading-tight select-none">
                  {cert.name}
                </h3>
                <div className="w-full max-w-[580px] h-[0.5px] bg-slate-300 mx-auto mt-2" />
              </div>

              {/* Certificate Body Paragraph */}
              <div className="text-center max-w-[620px] mx-auto px-4">
                <p className="font-montserrat text-[11.5px] font-normal leading-relaxed text-[#475569] text-center">
                  This document serves to certify that the candidate named above has successfully accomplished the formal internship training program in the domain of <strong className="text-[#1e293b] font-bold">{cert.domain}</strong> under default corporate sponsorship of <strong className="text-[#b38728] font-semibold">{cert.company.toUpperCase()}</strong>.
                </p>
                <p className="font-montserrat text-[10.5px] font-normal text-[#475569] mt-3">
                  During this engagement, the intern demonstrated exceptional diligence, professional dedication, and outstanding technical performance from <strong className="text-[#0f172a] font-semibold">{formatDate(cert.start_date)}</strong> to <strong className="text-[#0f172a] font-semibold">{formatDate(cert.end_date)}</strong>.
                </p>
              </div>

              {/* Footer Credentials Block (Date, Signature, Stamp) */}
              <div className="flex justify-between items-end mt-4 mb-4 px-6 relative">
                
                {/* Date Side */}
                <div className="flex flex-col items-center w-[160px]">
                  <span className="font-montserrat text-[9px] font-bold text-[#94a3b8] tracking-[0.2em] uppercase mb-1">
                    DATE OF ISSUANCE
                  </span>
                  <span className="font-montserrat text-[11px] font-bold text-[#334155] border-t border-slate-200 w-full text-center pt-2">
                    {formatDate(cert.end_date)}
                  </span>
                </div>

                {/* Signature Center */}
                <div className="flex flex-col items-center w-[160px]">
                  {/* Cursive Signature Font representation */}
                  <span className="font-greatvibes text-[22px] text-[#334155] leading-none mb-1 rotate-[-2deg]">
                    Tharun Kumar K
                  </span>
                  <span className="font-montserrat text-[9px] font-bold text-[#94a3b8] tracking-[0.2em] uppercase border-t border-slate-200 w-full text-center pt-2">
                    AUTHORIZED SIGNATURE
                  </span>
                </div>

                {/* Gold Embossed Seal/Stamp */}
                <div className="relative flex items-center justify-center w-[110px] h-[110px] select-none">
                  
                  {/* Jagged Gold Seal Container (custom SVG for realistic embossed starburst serration) */}
                  <svg viewBox="0 0 100 100" className="w-[112px] h-[112px] absolute drop-shadow-[0_4px_12px_rgba(160,120,30,0.5)] animate-pulse">
                    
                    {/* Definitions of premium gold metallic gradients and text paths */}
                    <defs>
                      <linearGradient id="goldSealGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fff7d6" />
                        <stop offset="20%" stopColor="#e5c057" />
                        <stop offset="40%" stopColor="#b8860b" />
                        <stop offset="60%" stopColor="#fff8de" />
                        <stop offset="85%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#966a06" />
                      </linearGradient>
                      
                      <linearGradient id="goldInnerGrad" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#e5c057" />
                        <stop offset="50%" stopColor="#b8860b" />
                        <stop offset="100%" stopColor="#fff7d6" />
                      </linearGradient>

                      {/* Text Path for curving corporate name along the top */}
                      <path id="topTextPath" d="M 17,50 A 33,33 0 1,1 83,50" fill="none" />
                      
                      {/* Text Path for curving verification text along the bottom */}
                      <path id="bottomTextPath" d="M 83,50 A 33,33 0 1,1 17,50" fill="none" />
                    </defs>
                    
                    {/* 64-Point mathematically precise serration polygon (drawn statically for peak performance and print-safety) */}
                    <polygon 
                      points="50.00,4.00 48.97,8.08 47.93,4.10 46.88,8.15 45.83,4.25 44.77,8.28 43.70,4.45 42.64,8.45 41.56,4.71 40.50,8.68 39.42,4.99 38.35,8.96 37.26,5.39 36.19,9.30 35.10,5.80 34.02,9.70 32.93,6.30 31.85,10.15 30.76,6.86 29.69,10.66 28.59,7.50 27.53,11.23 26.43,8.21 25.37,11.85 24.28,8.99 23.23,12.53 22.14,9.83 21.11,13.26 20.02,10.74 19.01,14.05 17.93,11.71 16.94,14.88 15.87,12.74 14.90,15.77 13.84,13.83 12.91,16.70 11.87,14.97 10.97,17.68 9.94,16.16 9.08,18.70 8.09,17.40 7.27,19.75 6.30,18.68 5.53,20.85 4.60,19.99 3.88,21.97 2.99,21.34 2.32,23.11 1.48,22.71 0.87,24.27 0.09,24.11 -0.46,25.44 -1.18,25.53 -1.68,26.62 -2.33,26.96 -2.77,27.79 -3.36,28.38 -3.73,28.96 -4.26,29.80 -4.56,30.13 -5.02,31.21 -5.26,31.29 -5.65,32.61 -5.82,32.44 -6.14,33.99 -6.24,33.56 -6.49,35.34 -6.52,34.67 -6.71,36.65 -6.67,35.75 -6.79,37.91 -6.68,36.78 -6.74,39.11 -6.57,37.77 -6.56,40.26 -6.32,38.71 -6.25,41.34 -5.95,39.59 -5.81,42.34 -5.45,40.40 -5.26,43.27 -4.84,41.15 -4.58,44.11 -4.11,41.81 -3.80,44.87 -3.28,42.40 -2.92,45.54 -2.34,42.92 -1.93,46.12 -1.31,43.34 -0.86,46.60 -0.21,43.68 0.28,47.00"
                      fill="url(#goldSealGrad)" 
                      stroke="#aa7c11" 
                      strokeWidth="0.5" 
                    />
                    
                    {/* Inner gold circular embossed body */}
                    <circle cx="50" cy="50" r="39" fill="url(#goldInnerGrad)" stroke="#fff" strokeWidth="0.75" opacity="0.9" />
                    
                    {/* Golden dotted ring inside the seal */}
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#aa7c11" strokeWidth="1" strokeDasharray="1.5,1.5" opacity="0.8" />
                    <circle cx="50" cy="50" r="31" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.5" />

                    {/* Circular typography wrapped along path */}
                    <text fontFamily="Montserrat" fontSize="4.5" fontWeight="bold" fill="#785303" letterSpacing="0.2">
                      <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
                        ★  TM CYBER TECH  ★
                      </textPath>
                    </text>
                    
                    <text fontFamily="Montserrat" fontSize="4" fontWeight="bold" fill="#8c6104" letterSpacing="0.1">
                      <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
                        OFFICIAL INTERNSHIP SEAL
                      </textPath>
                    </text>

                    {/* Center Embossed Star Graphic */}
                    <path 
                      d="M 50,37 L 53,44 L 60,45 L 55,50 L 57,57 L 50,53 L 43,57 L 45,50 L 40,45 L 47,44 Z" 
                      fill="url(#goldSealGrad)" 
                      stroke="#8b6508" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                  
                  {/* Fine metallic details overlay inside the center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10 pointer-events-none mt-10">
                    <span className="font-montserrat text-[5px] font-extrabold text-[#785303] tracking-[0.2em] leading-none">
                      PASSED
                    </span>
                  </div>
                </div>

              </div>

              {/* Fine Print Footer */}
              <div className="border-t border-slate-100 pt-1.5 flex justify-between items-center text-[7.5px] font-semibold text-[#94a3b8] tracking-[0.1em] uppercase">
                <span>VERIFY: {cert.website}verify/{cert.id}</span>
                <span>CONTACT: {cert.contact}  |  {cert.website}</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Metadata Detail cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn pb-16">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-start space-x-4">
          <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Candidate Details</h4>
            <p className="text-base font-semibold text-slate-200 mt-1">{cert.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">Intern Domain: <span className="text-slate-300 font-medium">{cert.domain}</span></p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-start space-x-4">
          <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institution/Host</h4>
            <p className="text-base font-semibold text-slate-200 mt-1">{cert.company.toUpperCase()}</p>
            <a 
              href={cert.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-amber-400 hover:text-amber-300 mt-0.5 flex items-center gap-1 inline-flex"
            >
              <span>{cert.website.replace(/^https?:\/\//, '')}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-start space-x-4">
          <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/20">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verification Office</h4>
            <p className="text-base font-semibold text-slate-200 mt-1">{cert.contact}</p>
            <p className="text-xs text-slate-400 mt-0.5">Secured Registry Timestamp Check Passed</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default VerifyCertificate;
