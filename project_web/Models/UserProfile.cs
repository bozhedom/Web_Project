using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;

namespace project_web.Models;

public class UserProfile 
{
    [Key] 
    public Guid Id { get; set; } = Guid.Empty;

    public Guid UserId { get; set; } = Guid.Empty;
    [ForeignKey("UserId")] public User? User { get; set; }

    public string Interests { get; set; } = string.Empty;

    public string Knowledge { get; set; } = string.Empty;

    public bool Mentor { get; set; } = false;

    public bool Student { get; set; } = false;

    public bool SearchStudent { get; set; } = false;

    public string Hobby { get; set; } = string.Empty;
}

