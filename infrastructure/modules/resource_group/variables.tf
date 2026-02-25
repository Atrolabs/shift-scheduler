variable "additional_tags" {
  default     = {}
  description = "Optional additional tags applied on top of global + module tags"
  type        = map(string)
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "suffix" {
  description = "Suffix for the resource name"
  type        = string
}