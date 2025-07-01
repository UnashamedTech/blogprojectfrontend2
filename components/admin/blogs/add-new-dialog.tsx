'use client';

import type React from 'react';
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  X,
  Plus,
  Upload,
  Palette,
  Type,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { LayoutSelectionModal } from './layout-selection-modal';
import Image from 'next/image';

interface AddNewDialogProps {
  triggerState: boolean;
  setTriggerState: (state: boolean) => void;
}

interface ImageItem {
  id: string;
  name: string;
  size: string;
  file: File;
  preview: string;
}

interface ParagraphSection {
  id: string;
  content: string;
  image?: ImageItem;
  formatting: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    align: 'left' | 'center' | 'right';
    color: string;
    fontSize: string;
    fontFamily: string;
  };
}

interface ValidationErrors {
  title?: string;
  category?: string;
  author?: string;
  location?: string;
  heroImages?: string;
  paragraphs?: string;
}

type BlogLayout = 'image-scattered' | 'image-top';

const colorOptions = [
  { value: '#000000', label: 'Black' },
  { value: '#dc2626', label: 'Red' },
  { value: '#2563eb', label: 'Blue' },
  { value: '#16a34a', label: 'Green' },
  { value: '#ca8a04', label: 'Yellow' },
  { value: '#9333ea', label: 'Purple' },
  { value: '#ea580c', label: 'Orange' },
  { value: '#0891b2', label: 'Cyan' },
];

const fontSizeOptions = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
];

const fontFamilyOptions = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Courier New, monospace', label: 'Courier New' },
];

export function AddNewDialog({
  triggerState,
  setTriggerState,
}: AddNewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLayoutModal, setShowLayoutModal] = useState(false);
  const [selectedLayout, setSelectedLayout] =
    useState<BlogLayout>('image-scattered');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    location: '',
  });
  const [heroImages, setHeroImages] = useState<ImageItem[]>([]);
  const [paragraphs, setParagraphs] = useState<ParagraphSection[]>([
    {
      id: '1',
      content: '',
      formatting: {
        bold: false,
        italic: false,
        underline: false,
        align: 'left',
        color: '#000000',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
      },
    },
  ]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const paragraphFileInputRefs = useRef<{
    [key: string]: HTMLInputElement | null;
  }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  const handleHeroFileUpload = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      if (heroImages.length + files.length > 5) {
        toast.error('Maximum 5 hero images allowed');
        return;
      }

      const validFiles = Array.from(files).filter((file) => {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not a valid image file`);
          return false;
        }
        if (file.size > 50 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 50MB`);
          return false;
        }
        return true;
      });

      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: ImageItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: formatFileSize(file.size),
            file: file,
            preview: e.target?.result as string,
          };
          setHeroImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      });

      toast.success(`${validFiles.length} hero image(s) uploaded successfully`);
      if (validationErrors.heroImages) {
        setValidationErrors((prev) => ({ ...prev, heroImages: undefined }));
      }
    },
    [heroImages.length, validationErrors.heroImages]
  );

  const handleParagraphFileUpload = useCallback(
    (files: FileList | null, paragraphId: string) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a valid image file`);
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 50MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: ImageItem = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: formatFileSize(file.size),
          file: file,
          preview: e.target?.result as string,
        };

        setParagraphs((prev) =>
          prev.map((p) =>
            p.id === paragraphId ? { ...p, image: newImage } : p
          )
        );
      };
      reader.readAsDataURL(file);

      toast.success('Paragraph image uploaded successfully');
    },
    []
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleHeroDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleHeroFileUpload(files);
  };

  const handleParagraphDrop = (e: React.DragEvent, paragraphId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleParagraphFileUpload(files, paragraphId);
  };

  const handleHeroBrowseClick = () => {
    heroFileInputRef.current?.click();
  };

  const handleParagraphBrowseClick = (paragraphId: string) => {
    paragraphFileInputRefs.current[paragraphId]?.click();
  };

  const handleRemoveHeroImage = (imageId: string) => {
    setHeroImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleRemoveParagraphImage = (paragraphId: string) => {
    setParagraphs((prev) =>
      prev.map((p) => (p.id === paragraphId ? { ...p, image: undefined } : p))
    );
  };

  const addParagraph = () => {
    const newParagraph: ParagraphSection = {
      id: Date.now().toString(),
      content: '',
      formatting: {
        bold: false,
        italic: false,
        underline: false,
        align: 'left',
        color: '#000000',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
      },
    };
    setParagraphs((prev) => [...prev, newParagraph]);
  };

  const removeParagraph = (paragraphId: string) => {
    if (paragraphs.length <= 1) {
      toast.error('At least one paragraph is required');
      return;
    }
    setParagraphs((prev) => prev.filter((p) => p.id !== paragraphId));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }
    if (!formData.author.trim()) {
      errors.author = 'Author is required';
    }
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }

    if (heroImages.length === 0) {
      errors.heroImages = 'At least one hero image is required';
    } else if (heroImages.length > 5) {
      errors.heroImages = 'Maximum 5 hero images allowed';
    }

    const validParagraphs = paragraphs.filter((p) => p.content.trim());
    if (validParagraphs.length === 0) {
      errors.paragraphs = 'At least one paragraph with content is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAsDraft = () => {
    toast.success('Blog saved as draft');
    setIsOpen(false);
  };

  const handlePost = () => {
    if (!validateForm()) {
      toast.error('Please fix all validation errors before posting');
      return;
    }
    setShowLayoutModal(true);
  };

  const handleFinalPost = () => {
    // Here the data including selectedLayout will be send to backend
    toast.success('Blog posted successfully');
    setShowLayoutModal(false);
    setIsOpen(false);
    setTriggerState(!triggerState);
  };

  const handleCancelLayout = () => {
    setShowLayoutModal(false);
  };

  const applyFormatting = (
    paragraphId: string,
    format: keyof ParagraphSection['formatting'],
    value?: string | boolean
  ) => {
    setParagraphs((prev) =>
      prev.map((p) =>
        p.id === paragraphId
          ? {
              ...p,
              formatting: {
                ...p.formatting,
                [format]:
                  value !== undefined
                    ? value
                    : !p.formatting[format as keyof typeof p.formatting],
              },
            }
          : p
      )
    );
  };

  const setAlignment = (
    paragraphId: string,
    align: 'left' | 'center' | 'right'
  ) => {
    setParagraphs((prev) =>
      prev.map((p) =>
        p.id === paragraphId
          ? { ...p, formatting: { ...p.formatting, align } }
          : p
      )
    );
  };

  const getTextStyle = (formatting: ParagraphSection['formatting']) => {
    return {
      fontWeight: formatting.bold ? 'bold' : 'normal',
      fontStyle: formatting.italic ? 'italic' : 'normal',
      textDecoration: formatting.underline ? 'underline' : 'none',
      textAlign: formatting.align as 'left' | 'center' | 'right',
      color: formatting.color,
      fontSize: formatting.fontSize,
      fontFamily: formatting.fontFamily,
    };
  };

  const ToolbarButton = ({
    icon: Icon,
    active = false,
    onClick,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    active?: boolean;
    onClick?: () => void;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      className={`h-8 w-8 p-0 ${active ? 'bg-muted' : ''}`}
      onClick={onClick}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  const ColorPicker = ({
    paragraphId,
    currentColor,
  }: {
    paragraphId: string;
    currentColor: string;
  }) => (
    <Select
      value={currentColor}
      onValueChange={(value) => applyFormatting(paragraphId, 'color', value)}
    >
      <SelectTrigger className="w-20 h-8">
        <div className="flex items-center gap-1">
          <Palette className="h-3 w-3" />
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: currentColor }}
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        {colorOptions.map((color) => (
          <SelectItem key={color.value} value={color.value}>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border"
                style={{ backgroundColor: color.value }}
              />
              {color.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const FontSizeSelector = ({
    paragraphId,
    currentSize,
  }: {
    paragraphId: string;
    currentSize: string;
  }) => (
    <Select
      value={currentSize}
      onValueChange={(value) => applyFormatting(paragraphId, 'fontSize', value)}
    >
      <SelectTrigger className="w-16 h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {fontSizeOptions.map((size) => (
          <SelectItem key={size.value} value={size.value}>
            {size.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const FontFamilySelector = ({
    paragraphId,
    currentFont,
  }: {
    paragraphId: string;
    currentFont: string;
  }) => (
    <Select
      value={currentFont}
      onValueChange={(value) =>
        applyFormatting(paragraphId, 'fontFamily', value)
      }
    >
      <SelectTrigger className="w-32 h-8">
        <div className="flex items-center gap-1">
          <Type className="h-3 w-3" />
          <span className="truncate">
            {fontFamilyOptions.find((f) => f.value === currentFont)?.label}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {fontFamilyOptions.map((font) => (
          <SelectItem key={font.value} value={font.value}>
            <span style={{ fontFamily: font.value }}>{font.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const RichTextToolbar = ({
    paragraphId,
    formatting,
  }: {
    paragraphId: string;
    formatting: ParagraphSection['formatting'];
  }) => (
    <div className="flex items-center gap-2 p-2 border-b bg-muted/30 flex-wrap">
      <ToolbarButton
        icon={Bold}
        active={formatting.bold}
        onClick={() => applyFormatting(paragraphId, 'bold')}
      />
      <ToolbarButton
        icon={Italic}
        active={formatting.italic}
        onClick={() => applyFormatting(paragraphId, 'italic')}
      />
      <ToolbarButton
        icon={Underline}
        active={formatting.underline}
        onClick={() => applyFormatting(paragraphId, 'underline')}
      />
      <div className="w-px h-4 bg-border mx-1" />
      <ToolbarButton
        icon={AlignLeft}
        active={formatting.align === 'left'}
        onClick={() => setAlignment(paragraphId, 'left')}
      />
      <ToolbarButton
        icon={AlignCenter}
        active={formatting.align === 'center'}
        onClick={() => setAlignment(paragraphId, 'center')}
      />
      <ToolbarButton
        icon={AlignRight}
        active={formatting.align === 'right'}
        onClick={() => setAlignment(paragraphId, 'right')}
      />
      <div className="w-px h-4 bg-border mx-1" />
      <ToolbarButton icon={List} />
      <ToolbarButton icon={ListOrdered} />
      <div className="w-px h-4 bg-border mx-1" />
      <ToolbarButton icon={Link} />
      <div className="w-px h-4 bg-border mx-1" />
      <ColorPicker paragraphId={paragraphId} currentColor={formatting.color} />
      <FontSizeSelector
        paragraphId={paragraphId}
        currentSize={formatting.fontSize}
      />
      <FontFamilySelector
        paragraphId={paragraphId}
        currentFont={formatting.fontFamily}
      />
    </div>
  );

  const HeroImageUploadArea = () => (
    <div
      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
      onDragOver={handleDragOver}
      onDrop={handleHeroDrop}
      onClick={handleHeroBrowseClick}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Upload className="w-6 h-6 text-orange-500" />
        </div>
        <div className="text-sm text-muted-foreground">
          Drag and drop an image for Hero, or{' '}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Browse
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Maximum file size: 50mb, maximum 5 images
        </div>
      </div>
    </div>
  );

  const ParagraphImageUploadArea = ({
    paragraphId,
  }: {
    paragraphId: string;
  }) => (
    <div
      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
      onDragOver={handleDragOver}
      onDrop={(e) => handleParagraphDrop(e, paragraphId)}
      onClick={() => handleParagraphBrowseClick(paragraphId)}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Upload className="w-4 h-4 text-blue-500" />
        </div>
        <div className="text-xs text-muted-foreground">
          Add image (optional) -{' '}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Browse
          </span>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <Button
        className="bg-green-600 hover:bg-green-700"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New
      </Button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex flex-col h-screen w-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-white shrink-0">
            <div>
              <h2 className="text-xl font-semibold">Add a Blog</h2>
              <p className="text-sm text-muted-foreground">
                Manage your blogs here
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSaveAsDraft}>
                Save as Draft
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handlePost}
              >
                Post
              </Button>
            </div>
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Left Side - Hero Image Upload */}
            <div className="w-1/3 border-r bg-gray-50 flex flex-col">
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="space-y-4">
                  <HeroImageUploadArea />
                  {validationErrors.heroImages && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {validationErrors.heroImages}
                    </div>
                  )}

                  <input
                    ref={heroFileInputRef}
                    title="input"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleHeroFileUpload(e.target.files)}
                  />

                  {heroImages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Images Selected ({heroImages.length}/5)
                      </h3>
                      <div className="space-y-2">
                        {heroImages.map((image) => (
                          <div
                            key={image.id}
                            className="flex items-center gap-3 p-2 bg-white rounded border"
                          >
                            <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center overflow-hidden">
                              <Image
                                src={image.preview || '/placeholder.svg'}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">
                                {image.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {image.size}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveHeroImage(image.id)}
                              className="h-6 w-6 p-0 shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Form and Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <div className="space-y-6 max-w-4xl">
                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter blog title"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange('title', e.target.value)
                          }
                          className={
                            validationErrors.title ? 'border-red-500' : ''
                          }
                        />
                        {validationErrors.title && (
                          <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.title}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            handleInputChange('category', value)
                          }
                        >
                          <SelectTrigger
                            className={
                              validationErrors.category ? 'border-red-500' : ''
                            }
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="faith">Faith</SelectItem>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                        {validationErrors.category && (
                          <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.category}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="author">Author *</Label>
                        <Input
                          id="author"
                          placeholder="Author name"
                          value={formData.author}
                          onChange={(e) =>
                            handleInputChange('author', e.target.value)
                          }
                          className={
                            validationErrors.author ? 'border-red-500' : ''
                          }
                        />
                        {validationErrors.author && (
                          <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.author}
                          </div>
                        )}
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          placeholder="Location"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange('location', e.target.value)
                          }
                          className={
                            validationErrors.location ? 'border-red-500' : ''
                          }
                        />
                        {validationErrors.location && (
                          <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {validationErrors.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                      {validationErrors.paragraphs && (
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.paragraphs}
                        </div>
                      )}

                      {paragraphs.map((paragraph, index) => (
                        <div
                          key={paragraph.id}
                          className="space-y-4 border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">
                              Paragraph {index + 1}
                            </h3>
                            {paragraphs.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeParagraph(paragraph.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>

                          <div className="border rounded-lg overflow-hidden">
                            <RichTextToolbar
                              paragraphId={paragraph.id}
                              formatting={paragraph.formatting}
                            />
                            <textarea
                              placeholder="Start writing your paragraph here..."
                              className="w-full min-h-[120px] p-3 border-0 resize-none focus:outline-none"
                              style={getTextStyle(paragraph.formatting)}
                              value={paragraph.content}
                              onChange={(e) => {
                                setParagraphs((prev) =>
                                  prev.map((p) =>
                                    p.id === paragraph.id
                                      ? { ...p, content: e.target.value }
                                      : p
                                  )
                                );
                                if (validationErrors.paragraphs) {
                                  setValidationErrors((prev) => ({
                                    ...prev,
                                    paragraphs: undefined,
                                  }));
                                }
                              }}
                            />
                          </div>

                          {/* Paragraph Image Upload */}
                          <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">
                              Paragraph Image (Optional)
                            </Label>
                            {paragraph.image ? (
                              <div className="relative">
                                <Image
                                  src={
                                    paragraph.image.preview ||
                                    '/placeholder.svg'
                                  }
                                  alt={paragraph.image.name}
                                  className="w-full max-w-md h-48 object-cover rounded border"
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    handleRemoveParagraphImage(paragraph.id)
                                  }
                                  className="absolute top-2 right-2 h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {paragraph.image.name} ({paragraph.image.size}
                                  )
                                </div>
                              </div>
                            ) : (
                              <ParagraphImageUploadArea
                                paragraphId={paragraph.id}
                              />
                            )}

                            <input
                              title="input"
                              ref={(el) => {
                                if (el)
                                  paragraphFileInputRefs.current[paragraph.id] =
                                    el;
                              }}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleParagraphFileUpload(
                                  e.target.files,
                                  paragraph.id
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}

                      <div className="pb-8">
                        <Button
                          onClick={addParagraph}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add a paragraph
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Selection Modal */}
      <LayoutSelectionModal
        isOpen={showLayoutModal}
        selectedLayout={selectedLayout}
        onLayoutChange={setSelectedLayout}
        onCancel={handleCancelLayout}
        onConfirm={handleFinalPost}
      />
    </>
  );
}
