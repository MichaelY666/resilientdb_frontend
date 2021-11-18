import React, { useState } from "react";
import { Col } from "react-bootstrap";
import IsoTopeGrid from "react-isotope";
import {Container, Row, Card, Label, Input, FormGroup} from 'reactstrap';




function FileList(){

    const cardsDefault = [
        {
          id: "a",
          filter: ["test", "chart"]
        },
        {
          id: "b",
          filter: ["test1", "tile"]
        },
        {
          id: "c",
          filter: ["test", "chart"]
        },
        {
          id: "d",
          filter: ["test1", "tile"]
        },
        {
          id: "e",
          filter: ["test", "tile"]
        },
        {
          id: "f",
          filter: ["test1", "chart"]
        },
        {
          id: "h",
          filter: ["test1", "chart"]
        }
      ];
    
    
      const filtersDefault = [
        { label: "all", isChecked: true },
        { label: "test", isChecked: false },
        { label: "test1", isChecked: false },
        { label: "chart", isChecked: false },
        { label: "tile", isChecked: false }
      ];
    

    const [filters, updateFilters] = useState(filtersDefault);

    const onFilter = event => {
      const {
        target: { value, checked }
      } = event;
  
      updateFilters(state =>
        state.map(f => {
          if (f.label === value) {
            return {
              ...f,
              isChecked: checked
            };
          }
  
          return f;
        })
      );
    };

  
    return (
        <div>
        <Container>
            <Row>
                {filters.map(f => (
                    <Col>
                    <FormGroup>
                        <div className="filter" key={`${f.label}_key`}>
                            <Input
                                id={f.label}
                                type="checkbox"
                                value={f.label}
                                onChange={onFilter}
                                checked={f.isChecked}
                                className="form-control-lg"
              
                            />
                            <Label className="form-control-lg" htmlFor={f.label} style={{fontSize: 25, color: "white", textAlign: 'center', backgroundColor: "grey"}}>{f.label}</Label>
                        </div>
                        </FormGroup>
                    </Col>
                ))}
            </Row>
          
        <IsoTopeGrid
          gridLayout={cardsDefault}
          noOfCols={2}
          unitWidth={350}
          unitHeight={50}
          filters={filters}
        >
          {cardsDefault.map(card => (
            <Card key={card.id} className={`card ${card.filter[0]}`} color="primary">
              <div className="tags">
                {card.filter.map(c => (
                  <span>{c}</span>
                ))}
              </div>
              {card.id}
            </Card>
          ))}
        </IsoTopeGrid>
        
      </Container>
    </div>
  );
    
}

export default FileList;