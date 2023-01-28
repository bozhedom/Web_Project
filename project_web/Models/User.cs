using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace project_web.Models;

public class User 
{

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string UserPassword { get; set; }

    [Required]
    public string Role { get; set; }

    public List<Pair> Pare { get; set; } = new();
    public UserProfile? UserProfile { get; set; } = null;

}

