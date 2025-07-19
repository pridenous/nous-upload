"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data type
interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  joinDate: string
}

// Skeleton Row Component
function TableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-48" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
    </TableRow>
  )
}

// Table Skeleton Component
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Join Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRowSkeleton key={index} />
        ))}
      </TableBody>
    </Table>
  )
}

// Actual Table Component
function UserTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Join Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
            </TableCell>
            <TableCell>{user.joinDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    joinDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "inactive",
    joinDate: "2024-01-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "active",
    joinDate: "2024-01-25",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-05",
  },
]

export default function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    setIsLoading(true)
    setUsers([]) // Clear existing data

    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers)
      setIsLoading(false)
    }, 2000)
  }

  // Load data on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <Button onClick={fetchUsers} disabled={isLoading}>
              {isLoading ? "Loading..." : "Refresh Data"}
            </Button>
          </CardHeader>
          <CardContent>{isLoading ? <TableSkeleton rows={5} /> : <UserTable users={users} />}</CardContent>
        </Card>

        {/* Demo Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Demo Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={() => setIsLoading(true)} variant="outline">
                Show Skeleton
              </Button>
              <Button onClick={() => setIsLoading(false)} variant="outline">
                Show Data
              </Button>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Fitur Table Skeleton:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Skeleton mengikuti struktur tabel asli</li>
                <li>• Ukuran skeleton disesuaikan dengan konten</li>
                <li>• Animasi shimmer untuk efek loading</li>
                <li>• Jumlah rows skeleton dapat dikonfigurasi</li>
                <li>• Header tetap terlihat saat loading</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
