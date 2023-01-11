
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ctqwybfuqhktkjutgoqi.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cXd5YmZ1cWhrdGtqdXRnb3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI4MzkzMDMsImV4cCI6MTk4ODQxNTMwM30.KrxRDz-mEFWNy8sO8WXcFQAWmVnRSTeIYdtHVRmdjTQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;