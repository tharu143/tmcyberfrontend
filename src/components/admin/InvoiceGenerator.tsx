import React, { useState, useRef } from 'react';
import { FileText, Download, Printer, Trash2, Plus, Minus, Upload, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Define interfaces for type safety
interface Item {
  id: number;
  description: string;
  type: string;
  hours: number;
  rate: number;
  amount: number;
}

interface FormData {
  documentType: 'invoice' | 'quotation';
  companyName: string;
  companyPhone: string;
  companyAddress: string;
  companyEmail: string;
  clientName: string;
  clientContact: string;
  clientAddress: string;
  projectName: string;
  documentNumber: string;
  date: string;
  currency: string;
  items: Item[];
  notes: string;
  paymentMethods: string;
  logo: string | null;
  taxPercentage: number;
}

// Simplified Shadcn UI components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'outline' | 'destructive';
  type?: 'button' | 'submit';
}> = ({ children, className = '', onClick, variant, type = 'button' }) => {
  let style =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2';
  if (variant === 'outline') {
    style += ' border border-input bg-background hover:bg-accent hover:text-accent-foreground';
  } else if (variant === 'destructive') {
    style += ' bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90';
  } else {
    style += ' bg-primary text-primary-foreground shadow hover:bg-primary/90';
  }
  return (
    <button className={`${style} ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
  >
    {children}
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label: React.FC<{ children: React.ReactNode; htmlFor?: string; className?: string }> = ({
  children,
  htmlFor,
  className = '',
}) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea
    className={`flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className = '' }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
    >
      {children}
    </select>
  </div>
);

const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between ${className}`}>{children}</div>
);

const SelectValue: React.FC = () => null;

const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => children;

const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const InvoiceGenerator: React.FC = () => {
  const [theme, setTheme] = useState<'gold' | 'blue'>('gold');
  const [formData, setFormData] = useState<FormData>({
    documentType: 'invoice',
    companyName: '',
    companyPhone: '',
    companyAddress: '',
    companyEmail: '',
    clientName: '',
    clientContact: '',
    clientAddress: '',
    projectName: '',
    documentNumber: '',
    date: '',
    currency: '₹',
    items: [{ id: 1, description: '', type: '', hours: 1, rate: 0, amount: 0 }],
    notes: '',
    paymentMethods: '',
    logo: null,
    taxPercentage: 0,
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData((prevState) => ({ ...prevState, [key]: value }));
  };

  const updateItem = (itemId: number, key: keyof Item, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [key]: value };
          if (key === 'hours' || key === 'rate') {
            updatedItem.amount = updatedItem.hours * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const addItem = () => {
    setFormData((prevState) => ({
      ...prevState,
      items: [...prevState.items, { id: Date.now(), description: '', type: '', hours: 1, rate: 0, amount: 0 }],
    }));
  };

  const removeItem = (itemId: number) => {
    setFormData((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.id !== itemId),
    }));
  };

  const clearForm = () => {
    setFormData({
      documentType: 'invoice',
      companyName: '',
      companyPhone: '',
      companyAddress: '',
      companyEmail: '',
      clientName: '',
      clientContact: '',
      clientAddress: '',
      projectName: '',
      documentNumber: '',
      date: '',
      currency: '₹',
      items: [{ id: 1, description: '', type: '', hours: 1, rate: 0, amount: 0 }],
      notes: '',
      paymentMethods: '',
      logo: null,
      taxPercentage: 0,
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Please select an image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        console.error('File size must be less than 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          updateFormData('logo', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateFormData('logo', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const exportToPDF = async () => {
    const previewElement = previewRef.current;
    if (!previewElement) return;
    try {
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        ignoreElements: (element) => element.classList.contains('no-pdf') || false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${formData.documentType}-${formData.documentNumber}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  const subtotal = formData.items.reduce((acc, item) => acc + item.amount, 0);
  const taxAmount = subtotal * (formData.taxPercentage / 100);
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Invoice & Quotation Generator
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <Button
                onClick={() => updateFormData('documentType', 'invoice')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.documentType === 'invoice'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Invoice
              </Button>
              <Button
                onClick={() => updateFormData('documentType', 'quotation')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.documentType === 'quotation'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Quotation
              </Button>
            </div>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <Button
                onClick={() => setTheme('gold')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  theme === 'gold'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Gold
              </Button>
              <Button
                onClick={() => setTheme('blue')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  theme === 'blue'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Blue
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {formData.documentType === 'invoice' ? 'Invoice' : 'Quotation'} Details
              </h2>
              <Badge className="capitalize">{formData.documentType}</Badge>
            </div>
            <div className="space-y-6">
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Your Company Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="logo">Company Logo (Optional)</Label>
                    <div className="mt-2 space-y-3">
                      {formData.logo ? (
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <img
                              src={formData.logo || 'https://placehold.co/96x96/E2E8F0/111827?text=Logo'}
                              alt="Company Logo"
                              className="w-24 h-24 object-contain border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                            />
                            <Button
                              onClick={removeLogo}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                              type="button"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Logo uploaded successfully
                            </p>
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                              <Upload className="h-4 w-4 mr-2" />
                              Change Logo
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Logo
                          </Button>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Supports JPG, PNG, GIF (max 5MB)
                          </span>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => updateFormData('companyName', e.target.value)}
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyPhone">Phone</Label>
                      <Input
                        id="companyPhone"
                        value={formData.companyPhone}
                        onChange={(e) => updateFormData('companyPhone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="companyAddress">Address</Label>
                    <Textarea
                      id="companyAddress"
                      value={formData.companyAddress}
                      onChange={(e) => updateFormData('companyAddress', e.target.value)}
                      placeholder="Your company address"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => updateFormData('companyEmail', e.target.value)}
                      placeholder="company@example.com"
                    />
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Client Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => updateFormData('clientName', e.target.value)}
                        placeholder="Client Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientContact">Contact</Label>
                      <Input
                        id="clientContact"
                        value={formData.clientContact}
                        onChange={(e) => updateFormData('clientContact', e.target.value)}
                        placeholder="client@example.com or phone"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="clientAddress">Client Address</Label>
                    <Textarea
                      id="clientAddress"
                      value={formData.clientAddress}
                      onChange={(e) => updateFormData('clientAddress', e.target.value)}
                      placeholder="Client address"
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Document Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) => updateFormData('projectName', e.target.value)}
                        placeholder="Project Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="documentNumber">
                        {formData.documentType === 'invoice' ? 'Invoice' : 'Quotation'} Number
                      </Label>
                      <Input
                        id="documentNumber"
                        value={formData.documentNumber}
                        onChange={(e) => updateFormData('documentNumber', e.target.value)}
                        placeholder="Auto-generated"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateFormData('date', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) => updateFormData('currency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="₹">₹ INR</SelectItem>
                          <SelectItem value="$">$ USD</SelectItem>
                          <SelectItem value="€">€ EUR</SelectItem>
                          <SelectItem value="£">£ GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Items / Services</h3>
                  <Button onClick={addItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Row
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-4">
                        {index === 0 && <Label className="text-xs text-gray-500 dark:text-gray-400">Description</Label>}
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Service description"
                        />
                      </div>
                      <div className="col-span-2">
                        {index === 0 && <Label className="text-xs text-gray-500 dark:text-gray-400">Type</Label>}
                        <Select
                          value={item.type}
                          onValueChange={(value) => updateItem(item.id, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Frontend">Frontend</SelectItem>
                            <SelectItem value="Backend">Backend</SelectItem>
                            <SelectItem value="API">API</SelectItem>
                            <SelectItem value="UI/UX">UI/UX</SelectItem>
                            <SelectItem value="Consulting">Consulting</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        {index === 0 && <Label className="text-xs text-gray-500 dark:text-gray-400">Hours</Label>}
                        <Input
                          type="number"
                          value={item.hours}
                          onChange={(e) => updateItem(item.id, 'hours', Number.parseFloat(e.target.value) || 0)}
                          placeholder="1"
                          min="0"
                          step="0.5"
                        />
                      </div>
                      <div className="col-span-2">
                        {index === 0 && <Label className="text-xs text-gray-500 dark:text-gray-400">Rate/Hour</Label>}
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', Number.parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="col-span-1">
                        {index === 0 && <Label className="text-xs text-gray-500 dark:text-gray-400">Amount</Label>}
                        <Input
                          type="number"
                          value={item.amount.toFixed(2)}
                          readOnly
                          className="bg-gray-50 dark:bg-gray-800"
                        />
                      </div>
                      <div className="col-span-1">
                        {index === 0 && <div className="h-4"></div>}
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="outline"
                          disabled={formData.items.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Totals</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Subtotal:</span>
                    <span className="font-medium">
                      {formData.currency}
                      {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="tax">Tax %:</Label>
                      <Input
                        id="tax"
                        type="number"
                        value={formData.taxPercentage}
                        onChange={(e) =>
                          updateFormData('taxPercentage', Number.parseFloat(e.target.value) || 0)
                        }
                        className="w-20"
                      />
                    </div>
                    <span className="font-medium">
                      {formData.currency}
                      {taxAmount.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between text-lg font-bold pt-2 border-t-2 ${
                      theme === 'gold' ? 'border-amber-500 text-amber-700' : 'border-blue-500 text-blue-700'
                    }`}
                  >
                    <span>Grand Total:</span>
                    <span>
                      {formData.currency}
                      {grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Notes / Terms</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => updateFormData('notes', e.target.value)}
                      placeholder="Additional notes, terms and conditions..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentMethods">Payment Methods</Label>
                    <Textarea
                      id="paymentMethods"
                      value={formData.paymentMethods}
                      onChange={(e) => updateFormData('paymentMethods', e.target.value)}
                      placeholder="Bank details, payment methods, etc..."
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-1/2 bg-gray-100 dark:bg-gray-900 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 no-print">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preview</h2>
              <div className="flex gap-2">
                <Button onClick={exportToPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="destructive" onClick={clearForm}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
            <Card className="bg-white dark:bg-gray-800 min-h-[800px] shadow-lg">
              <div ref={previewRef} className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    {formData.logo && (
                      <div className="w-24 h-24 mb-4">
                        <img
                          src={formData.logo || 'https://placehold.co/96x96/E2E8F0/111827?text=Logo'}
                          alt="Company Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formData.companyName || 'Your Company Name'}
                      </h1>
                      {formData.companyAddress && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line mt-1">
                          {formData.companyAddress}
                        </div>
                      )}
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                        {formData.companyPhone && <div>Phone: {formData.companyPhone}</div>}
                        {formData.companyEmail && <div>Email: {formData.companyEmail}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2
                      className={`text-3xl font-bold uppercase tracking-wide ${
                        theme === 'gold' ? 'text-amber-600' : 'text-blue-600'
                      }`}
                    >
                      {formData.documentType}
                    </h2>
                    <div className="mt-2 space-y-1 text-sm">
                      <div>
                        <span className="font-medium">
                          {formData.documentType === 'invoice' ? 'Invoice' : 'Quotation'} #:
                        </span>{' '}
                        {formData.documentNumber}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>{' '}
                        {formData.date ? new Date(formData.date).toLocaleDateString() : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`h-1 ${theme === 'gold' ? 'bg-amber-500' : 'bg-blue-500'} rounded`}></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Bill To:</h3>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <div className="font-medium">{formData.clientName || 'Client Name'}</div>
                      {formData.clientAddress && (
                        <div className="whitespace-pre-line">{formData.clientAddress}</div>
                      )}
                      {formData.clientContact && <div>{formData.clientContact}</div>}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Project:</h3>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <div className="font-medium">{formData.projectName || 'Project Name'}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Items / Services:</h3>
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                    <table className="w-full">
                      <thead className={`${theme === 'gold' ? 'bg-amber-50' : 'bg-blue-50'}`}>
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                            Description
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                            Type
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
                            Hours
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
                            Rate/Hour
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {formData.items.map((item, index) => (
                          <tr
                            key={item.id}
                            className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
                          >
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              {item.description || `Service ${index + 1}`}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                              {item.type}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                              {item.hours}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                              {formData.currency}
                              {item.rate.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right font-medium">
                              {formData.currency}
                              {item.amount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        {formData.currency}
                        {subtotal.toFixed(2)}
                      </span>
                    </div>
                    {formData.taxPercentage > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Tax ({formData.taxPercentage}%):</span>
                        <span className="font-medium">
                          {formData.currency}
                          {taxAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div
                      className={`flex justify-between text-lg font-bold pt-2 border-t-2 ${
                        theme === 'gold' ? 'border-amber-500 text-amber-700' : 'border-blue-500 text-blue-700'
                      }`}
                    >
                      <span>Total:</span>
                      <span>
                        {formData.currency}
                        {grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                {(formData.notes || formData.paymentMethods) && (
                  <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    {formData.notes && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Notes / Terms:
                        </h3>
                        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {formData.notes}
                        </div>
                      </div>
                    )}
                    {formData.paymentMethods && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Payment Information:
                        </h3>
                        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {formData.paymentMethods}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="pt-8 text-center">
                  <div
                    className={`text-sm ${
                      theme === 'gold' ? 'text-amber-600' : 'text-blue-600'
                    } font-medium`}
                  >
                    Thank you for your business!
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;