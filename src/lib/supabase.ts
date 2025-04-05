import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jiuwqyozoyxzsnskziqs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppdXdxeW96b3l4enNuc2t6aXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzYzMzMsImV4cCI6MjA1OTQ1MjMzM30.7mehMTV-vLlY1SZqq043RBjN3Nu3yocIQtC1a90A-s0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)