function isInsideQuadrangle(point, points) {
  // Extract the four points from the array
  const [p1, p2, p3, p4] = points;

  // Calculate the area of the quadrilateral
  const area =
    0.5 *
    Math.abs(
      p1.x * p2.y +
        p2.x * p3.y +
        p3.x * p4.y +
        p4.x * p1.y -
        p2.x * p1.y -
        p3.x * p2.y -
        p4.x * p3.y -
        p1.x * p4.y
    );

  // Calculate the areas of four triangles formed by the given point and each of the quadrilateral's edges
  const area1 =
    0.5 *
    Math.abs(
      point.x * p1.y +
        p1.x * p2.y +
        p2.x * point.y -
        p2.x * p1.y -
        p1.x * point.y -
        point.x * p2.y
    );
  const area2 =
    0.5 *
    Math.abs(
      point.x * p2.y +
        p2.x * p3.y +
        p3.x * point.y -
        p3.x * p2.y -
        p2.x * point.y -
        point.x * p3.y
    );
  const area3 =
    0.5 *
    Math.abs(
      point.x * p3.y +
        p3.x * p4.y +
        p4.x * point.y -
        p4.x * p3.y -
        p3.x * point.y -
        point.x * p4.y
    );
  const area4 =
    0.5 *
    Math.abs(
      point.x * p4.y +
        p4.x * p1.y +
        p1.x * point.y -
        p1.x * p4.y -
        p4.x * point.y -
        point.x * p1.y
    );

  // Check if the sum of the areas of the four triangles is equal to the area of the quadrilateral
  return Math.abs(area - (area1 + area2 + area3 + area4)) < 1; // add some small tolerance to account for floating point precision errors
}
export default isInsideQuadrangle;
