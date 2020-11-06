using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetAPI.Models;

namespace FleetAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class AircraftTypesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AircraftTypesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AircraftTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AircraftTypes>>> GetAircraftTypes()
        {
            return await _context.AircraftTypes.ToListAsync();
        }

        // GET: api/AircraftTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AircraftTypes>> GetAircraftTypes(int id)
        {
            var aircraftTypes = await _context.AircraftTypes.FindAsync(id);

            if (aircraftTypes == null)
            {
                return NotFound();
            }

            return aircraftTypes;
        }

        // PUT: api/AircraftTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAircraftTypes(int id, AircraftTypes aircraftTypes)
        {
            if (id != aircraftTypes.Id)
            {
                return BadRequest();
            }

            _context.Entry(aircraftTypes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AircraftTypesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AircraftTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AircraftTypes>> PostAircraftTypes(AircraftTypes aircraftTypes)
        {
            _context.AircraftTypes.Add(aircraftTypes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAircraftTypes", new { id = aircraftTypes.Id }, aircraftTypes);
        }

        // DELETE: api/AircraftTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AircraftTypes>> DeleteAircraftTypes(int id)
        {
            var aircraftTypes = await _context.AircraftTypes.FindAsync(id);
            if (aircraftTypes == null)
            {
                return NotFound();
            }

            _context.AircraftTypes.Remove(aircraftTypes);
            await _context.SaveChangesAsync();

            return aircraftTypes;
        }

        private bool AircraftTypesExists(int id)
        {
            return _context.AircraftTypes.Any(e => e.Id == id);
        }
    }
}
