"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Upload, Edit, RotateCcw, Trash2, File, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UploadedFile } from '@/interfaces/UploadedFile'
import { DeleteFile, getUploadedFiles, UploadFile, EditFile } from '../services/UploadService'
import { fileToBase64 } from "../helper/helper"
import TrueFocus from '../blocks/TextAnimations/TrueFocus/TrueFocus';
import LoadingPopup from "@/custom-components/Loading";

export default function UploadMenu() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingFile, setEditingFile] = useState<UploadedFile | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    setIsUploadDialogOpen(false)
    setIsLoading(true);
    if (selectedFile && description.trim()) {
        const newFile: UploadedFile = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        description: description.trim(),
        createdDate: new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        file: selectedFile,
      }

      const content = await fileToBase64(selectedFile)
      await UploadFilesNameAndDesc(newFile.fileName, newFile.description, content);
      await fetchFiles()

      setSelectedFile(null)
      setDescription("")
      setIsLoading(false);
    }
  }

  const handleEdit = (file: UploadedFile) => {
    setEditingFile(file)
    setDescription(file.description)
    setSelectedFile(file.file)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (editingFile && selectedFile && description.trim()) {
        setIsEditDialogOpen(false)
        setIsLoading(true)
        try {
            const content = await fileToBase64(selectedFile)
            await EditFile(editingFile.id, selectedFile.name, description, content)
            fetchFiles();
        } catch (error) {
            console.error('Failed to fetch edit files', error)
        } finally {
            setEditingFile(null)
            setSelectedFile(null)
            setDescription("")
            setIsEditDialogOpen(false)
            setIsLoading(false);
        }
    }
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true);
      try {
        const res = await DeleteFile(id);
        fetchFiles();
      } catch (error) {
        console.error('Failed to fetch delete files', error)
      } finally {
        setIsLoading(false);
      }
  }

  const resetUploadDialog = () => {
    setSelectedFile(null)
    setDescription("")
    setDragActive(false)
  }

  const resetEditDialog = () => {
    setEditingFile(null)
    setSelectedFile(null)
    setDescription("")
    setDragActive(false)
  }

  const fetchFiles = async () => {
      try {
        const res = await getUploadedFiles()
        setUploadedFiles(res.data);
        console.log('dari res.data',res.data);
        // setFiles(data)
      } catch (error) {
        console.error('Failed to fetch uploaded files', error)
      } finally {
        // setLoading(false)
      }
 }

  const UploadFilesNameAndDesc = async (
    filename: string,
    description: string,
    content: string
  ) => {
      try {
        console.log(filename, description);
        const res = await UploadFile(filename, description, content)
        console.log('dari res.data',res.data);
        // setFiles(data)
      } catch (error) {
        console.error('Failed to fetch uploaded files', error)
      } finally {
        // setLoading(false)
      }
 }

 useEffect(() => {
    fetchFiles()
 }, [])

 useEffect(() => {
    console.log('dari UploadedFiles',uploadedFiles);
 }, [uploadedFiles])

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col items-start">
        <TrueFocus 
            sentence="Nous Upload"
            manualMode={false}
            blurAmount={5}
            borderColor="black"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
        />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            File Upload Manager
          </CardTitle>
          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={(open) => {
              setIsUploadDialogOpen(open)
              if (!open) resetUploadDialog()
            }}
          >
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload File
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New File</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                 <div className="space-y-2" onClick={() => document.getElementById('fileInput').click()}>
                  {selectedFile ? (
                      <>
                        <File className="h-8 w-8 mx-auto text-green-500" />
                        <p className="text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </>
                      
                  ) : (
                      <>
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">Drag & drop file here or click to browse</p>
                      </>
                  )}
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter file description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpload} disabled={!selectedFile || !description.trim()}>
                    Upload
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No files uploaded yet</p>
              <p className="text-sm">Click the Upload File button to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Filename</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-gray-500" />
                        {file.fileName}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate" title={file.description}>
                        {file.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {file.createdDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(file)} className="h-8 w-8 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open)
          if (!open) resetEditDialog()
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
            <div className="space-y-2" onClick={() => document.getElementById('fileInputEdit').click()}>
                  <File className="h-8 w-8 mx-auto text-green-500" />
                  <p className="text-sm font-medium">{selectedFile ? selectedFile.name : editingFile?.fileName}</p>
                  <p className="text-sm text-gray-600">Drag & drop new file or click to browse</p>
              </div>
              <input
                id="fileInputEdit"
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Enter file description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} disabled={!selectedFile || !description.trim()}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <LoadingPopup isLoading={isLoading} message="Memproses Data"/>
    </div>
  )
}
